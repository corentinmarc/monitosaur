# datadog-test

## Requirements:
- Have `yarn cli` installed (https://yarnpkg.com/en/docs/install)


## To launch the app:
- run `yarn start` or `yarn start-with-fixtures` (to have some fake history data).
  This will: 
  - Install dependencies for the Front app and for the Express server.
  - Build the Front app.
  - Move the builded assets in `public/` folder of Express server.
  - Start the Express server on `localhost:3000`

## To test/lint the app:
- run `yarn test` to test.
- run `yarn lint` to lint.


## App architecture

### Front end (`app/`):
- Bundled via `Webpack`.
- Written in `Typescript` for type checked code.
- `React` is updating the DOM.
- `D3` to draw chart.
- State app managed by `Redux`.
- Styles are component linked using `CSS Modules` and `SASS`.
- Linting is done with `TSLint`.
- And a little touch of `Jest` tests.

### Back end (`server/`):
- Simple `Express` server


## App description
The app collect periodically (every 10 seconds) some monitoring metrics.

These metrics are displayed in live in left panel `Metrics` (CPU number, CPU load, free RAM, total RAM).

The CPU load is stored with an expiration of 1 hour, it permit to draw the `CPU evolution` in the main panel.
The `evolution period drawn in the chart is configurable` and choices are: 2 minutes, 10 minutes, 30 minutes or 1 hours.

An `alerting system` display alert messages in the right panel `Alerts` when ALERT_LOAD_THRESHOLD (set to 1) during the ALERT_DURATION_THRESHOLD (set to 2 minutes) is passed.

`Notifications` are also triggered by alerting system if the customer accept to use it.


## Possible Improvements:
- Debounce the alerts, now it is triggering a message + notification every 10 seconds when on alert zone. It can be disturbing for the customer.
- Add some configuration in the UI to set the ALERT_LOAD_THRESHOLD and the ALERT_DURATION_THRESHOLD. It could be useful to the customer to adapt the alerting for his need.
- Draw the evolution of other metrics, for exemple the RAM usage.
- Technically, I think the stack is fine and can scale pretty well. A possible evolution could be to refacto the structure to have a by `domain` approach.