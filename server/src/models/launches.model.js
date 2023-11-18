const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

launches.set(launch.flightNumber, launch);

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) return 100;
  return latestLaunch.flightNumber;
}

async function addNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLauch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLauch);
}

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
