import {doFetch} from './network';

const apiUrl =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

/**
 * https://digitransit.fi/en/developers/apis/1-routing-api/stops/#query-scheduled-departure-and-arrival-times-of-a-stop
 * @param {number} id - id number of the hsl stop
 * e.g. Karanristi stops: 2132208 (Leppävaara direcrion) & 2132207
 */
const getQueryForNextRidesByStopId = (id) => {
  return `{
    stop(id: "HSL:${id}") {
      name
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
          tripHeadsign
        }
      }
    }
  }`;
};

/**
 * Converts HSL time to readable string format
 * @param {nunber} seconds
 * @returns time in string format
 */
const convertTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds % 3606 / 60);
  return `${hours}:${mins < 10 ? '0' + mins : mins}`;
};

/**
 *
 * @param {number} id - hsl stop id (HSL:<id>)
 * @returns stop route data
 */
const getRoutesByStopId = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getQueryForNextRidesByStopId(id),
  };
  const routeData = await doFetch(apiUrl, false, options);
  console.log(routeData);
  return routeData.data.stop.stoptimesWithoutPatterns.map((route) => {
    return {
      name: route.trip.routeShortName,
      headsign: route.headsign,
      scheduledArrival: convertTime(route.scheduledArrival),
      realtimeArrival: convertTime(route.realtimeArrival),
    };
  });
};

const HSL = {getRoutesByStopId};
export default HSL;
