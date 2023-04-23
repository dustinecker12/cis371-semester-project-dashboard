import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
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
  const [lineId, setLineId] = useState('');

  useEffect(() => {
    getMachines();
  }, [lineId]);

  async function getMachines() {
    const configColl: CollectionReference = collection(
      db,
      `config/smt/lines/${line.id}/machines`
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
          console.log(`called getMachines from ${line.title}`);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {machines.map((m) => (
        <Box
          key={m.id}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'grey',
            margin: '5px',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              height: '150px',
              width: '150px',
              margin: '10px',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <h1>{m.title}</h1>
          </Box>

          <HeadInfo line={line} machine={m} />
          <NozzleInfo line={line} machine={m} />
          <FeederInfo line={line} machine={m} />
        </Box>
      ))}
    </Box>
  );
}
