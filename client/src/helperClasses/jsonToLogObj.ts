type Line = {
  id: string;
  title: string;
};

type Machine = {
  id: string;
  title: string;
  numBeams: number;
  numHeads: number;
};

type Log = {
  info: {
    idleTime: number;
    panelCount: number;
    placeCount: number;
    stopTime: number;
  };
  heads: [
    {
      headNum: number;
      pickup: number;
      place: number;
      error: number;
      errorPPM: number;
    }
  ];
  feeders: {
    tapeFeeders: [
      {
        slot: string;
        partNum: string;
        pickup: number;
        place: number;
        error: number;
        errorPPM: number;
      }
    ];
    stickFeeders: [
      {
        slot: string;
        partNum: string;
        pickup: number;
        place: number;
        error: number;
        errorPPM: number;
      }
    ];
    trayFeeders: [
      {
        slot: string;
        partNum: string;
        pickup: number;
        place: number;
        error: number;
        errorPPM: number;
      }
    ];
  };
  nozzles: [
    {
      slot: string;
      type: string;
      pickup: number;
      place: number;
      error: number;
      errorPPM: number;
    }
  ];
};

export default function jsonToLogObj(line: Line, machine: Machine): Log {
  const lineFolderName = line.title.replace(/\s/g, '').toLowerCase();
  const machineFolderName = machine.title.replace(/\s/g, '').toLowerCase();
  const log: Log = {
    info: {
      idleTime: 0,
      panelCount: 0,
      placeCount: 0,
      stopTime: 0,
    },
    heads: [
      {
        headNum: 0,
        pickup: 0,
        place: 0,
        error: 0,
        errorPPM: 0,
      },
    ],
    feeders: {
      tapeFeeders: [
        {
          slot: '',
          partNum: '',
          pickup: 0,
          place: 0,
          error: 0,
          errorPPM: 0,
        },
      ],
      stickFeeders: [
        {
          slot: '',
          partNum: '',
          pickup: 0,
          place: 0,
          error: 0,
          errorPPM: 0,
        },
      ],
      trayFeeders: [
        {
          slot: '',
          partNum: '',
          pickup: 0,
          place: 0,
          error: 0,
          errorPPM: 0,
        },
      ],
    },
    nozzles: [
      {
        slot: '',
        type: '',
        pickup: 0,
        place: 0,
        error: 0,
        errorPPM: 0,
      },
    ],
  };

  fetch(`/src/jsonLogs/${lineFolderName}/${machineFolderName}/Total.json`)
    .then((response) => response.json())
    .then((data) => {
      splitInfo(data);
      splitHeads(data);
      splitFeeders(data);
      splitNozzles(data);
    })
    .catch((error) => {
      console.error(error);
    });

  function splitInfo(data: any) {
    log.info.idleTime = data.info['Idle Time'];
    log.info.panelCount = data.info['Panel Count'];
    log.info.placeCount = data.info['Place Count'];
    log.info.stopTime = data.info['Stop Time'];
  }

  function splitHeads(data: any) {
    for (let i = 0; i < data.heads.length; i++) {
      const head = {
        headNum: 0,
        pickup: 0,
        place: 0,
        error: 0,
        errorPPM: 0,
      };

      head.headNum = i + 1;
      head.pickup = data.heads[i][2];
      head.place = data.heads[i][4];
      head.error = data.heads[i][6];
      head.errorPPM = data.heads[i][7];

      log.heads.push(head);
    }
    log.heads.splice(0, 1);
  }

  function splitFeeders(data: any) {
    for (let i = 0; i < data.feaders.stickFeeders.length; i++) {
      const feeder = {
        slot: '',
        partNum: '',
        pickup: 0,
        place: 0,
        error: 0,
        errorPPM: 0,
      };

      feeder.slot = data.feaders.stickFeeders[i][8];
      feeder.partNum = data.feaders.stickFeeders[i][1];
      feeder.pickup = data.feaders.stickFeeders[i][2];
      feeder.place = data.feaders.stickFeeders[i][4];
      feeder.error = data.feaders.stickFeeders[i][3];
      feeder.errorPPM = data.feaders.stickFeeders[i][5];

      log.feeders.stickFeeders.push(feeder);
    }

    for (let i = 0; i < data.feaders.trayFeeders.length; i++) {
      const feeder = {
        slot: '',
        partNum: '',
        pickup: 0,
        place: 0,
        error: 0,
        errorPPM: 0,
      };

      feeder.slot = data.feaders.trayFeeders[i][8];
      feeder.partNum = data.feaders.trayFeeders[i][1];
      feeder.pickup = data.feaders.trayFeeders[i][2];
      feeder.place = data.feaders.trayFeeders[i][4];
      feeder.error = data.feaders.trayFeeders[i][3];
      feeder.errorPPM = data.feaders.trayFeeders[i][5];

      log.feeders.trayFeeders.push(feeder);
    }

    for (let i = 0; i < data.feaders.tapeFeeders.length; i++) {
      const feeder = {
        slot: '',
        partNum: '',
        pickup: 0,
        place: 0,
        error: 0,
        errorPPM: 0,
      };

      feeder.slot = data.feaders.tapeFeeders[i][0];
      feeder.partNum = data.feaders.tapeFeeders[i][2];
      feeder.pickup = data.feaders.tapeFeeders[i][3];
      feeder.place = data.feaders.tapeFeeders[i][5];
      feeder.error = data.feaders.tapeFeeders[i][4];
      feeder.errorPPM = data.feaders.tapeFeeders[i][6];

      log.feeders.tapeFeeders.push(feeder);
    }
    log.feeders.stickFeeders.splice(0, 1);
    log.feeders.trayFeeders.splice(0, 1);
    log.feeders.tapeFeeders.splice(0, 1);
  }

  function splitNozzles(data: any) {
    for (let i = 0; i < data.nozzles.length; i++) {
      const nozzle = {
        slot: '',
        type: '',
        pickup: 0,
        place: 0,
        error: 0,
        errorPPM: 0,
      };

      nozzle.slot = data.nozzles[i][8];
      nozzle.type = data.nozzles[i][1];
      nozzle.pickup = data.nozzles[i][2];
      nozzle.place = data.nozzles[i][4];
      nozzle.error = data.nozzles[i][6];
      nozzle.errorPPM = data.nozzles[i][5];

      log.nozzles.push(nozzle);
    }
    log.nozzles.splice(0, 1);
  }

  return log;
}
