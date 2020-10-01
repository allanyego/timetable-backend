const express = require("express");
const fs = require("fs");
const path = require("path");
// const readline = require("readline");
const { google } = require("googleapis");

const auth = require("../middleware/auth");
const schema = require("../joi-schemas/lesson");
const createResponse = require("./helpers/create-response");
const controller = require("../controllers/lessons");
const credentials = require("../credentials");
const setupDates = require("../util/setup-dates");

const router = express.Router();

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, "..", "token.json");

let oAuth2Client;

if (!oAuth2Client) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  authorize(function (authUrl) {
    if (authUrl) {
      return res.json(
        createResponse({
          data: {
            msg: "REQUIRES_AUTH",
            url: authUrl,
          },
        })
      );
    }

    listEvents(function (err, events) {
      if (err) {
        return next(err);
      }

      res.json(createResponse({ data: events }));
    });
  });
});

router.post("/authorize", function (req, res, next) {
  const { code } = req.query;
  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      return next(err);
    }

    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error) => {
      if (error) {
        return next(error);
      }

      res.json(createResponse({ data: "Authorization complete." }));
    });
  });
});

router.post("/", async function (req, res, next) {
  try {
    await schema.newSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(
      createResponse({
        error: "Invalid data. Check that you provided all fields.",
      })
    );
  }

  try {
    const newLesson = await controller.add(req.body);
    const {
      _id,
      subject: { name },
      slot,
      day,
      class: location,
    } = newLesson;

    const { eventDayStart, eventDayEnd } = setupDates(day, slot);

    const event = {
      id: _id,
      summary: name,
      location,
      start: {
        dateTime: eventDayStart,
      },
      end: {
        dateTime: eventDayEnd,
      },
      recurrence: ["RRULE:FREQ=WEEKLY"],
    };

    addEvent(event, function (err, ev) {
      if (err) {
        return next(err);
      }

      res.status(204).json(createResponse({ data: ev }));
    });
  } catch (error) {
    if (error.message === "Slot taken.") {
      return res.json(
        createResponse({
          error: error.message,
        })
      );
    }

    return next(error);
  }
});

module.exports = router;

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(callback) {
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (error, token) => {
    if (error) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });

      callback(authUrl);
      return;
    }

    oAuth2Client.setCredentials(JSON.parse(token));
    callback();
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(callback) {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  calendar.events.list(
    {
      calendarId: "devyego@gmail.com",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) {
        return callback(err);
      }

      callback(null, res.data.items);
    }
  );
}

/**
 *
 * @param {google.calendar.Event} event an event object
 * @param {Function} callback
 */
function addEvent(event, callback) {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  calendar.events.insert(
    {
      calendarId: "devyego@gmail.com",
      resource: event,
    },
    function (err, e) {
      callback(err, e);
    }
  );
}
