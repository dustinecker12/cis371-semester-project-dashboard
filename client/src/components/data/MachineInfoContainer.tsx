import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import HeadInfo from './HeadInfo';
import NozzleInfo from './NozzleInfo';
import FeederInfo from './FeederInfo';
import { db } from '../../../firebase';
import {
  collection,
  getDocs,
  CollectionReference,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import Machine from '../settings/Machine';

type MachineInfoContainerProps = {
  line: Line;
};

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

export default function MachineInfoContainer({
  line,
}: MachineInfoContainerProps): JSX.Element {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [lineId, setLineId] = useState(line.id);

  useEffect(() => {
    getMachines();
  }, [line]);

  async function getMachines() {
    const configColl: CollectionReference = collection(
      db,
      `config/smt/lines/${lineId}/machines`
    );
    let tempMachines: Array<Machine> = [];

    try {
      await getDocs(configColl)
        .then((qs: QuerySnapshot) => {
          qs.forEach((qd: QueryDocumentSnapshot) => {
            let machine: Machine = {
              id: qd.id,
              title: qd.data().title,
              numBeams: qd.data().numBeams,
              numHeads: qd.data().numHeads,
            };

            tempMachines.push(machine);
          });
        })
        .then(() => {
          tempMachines.sort((a: Machine, b: Machine) =>
            a.title.localeCompare(b.title)
          );
          setMachines(tempMachines);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        margin: 'auto',
      }}
    >
      {machines.map((m) => (
        <Box
          key={m.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#141b2d',
            margin: '5px',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              margin: '10px',
              backgroundColor: '#d0d1d5',
              borderRadius: '10px',
            }}
          >
            <Typography variant="h4" textAlign="center" color="#525252">
              {m.title}
            </Typography>
          </Box>

          <HeadInfo line={line} machine={m} />
          <NozzleInfo line={line} machine={m} />
          <FeederInfo line={line} machine={m} />
        </Box>
      ))}
    </Box>
  );
}
