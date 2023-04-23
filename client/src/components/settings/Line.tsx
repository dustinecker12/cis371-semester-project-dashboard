import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Machine from '../settings/Machine';
import AddMachineModal from './AddMachineModal';
import EditMachineModal from './EditMachineModal';
import DeleteMachineModal from './DeleteMachineModal';
import { auth, db } from '../../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  CollectionReference,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentReference,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

type LineProps = {
  title: string;
  lineId: string;
};

type Machine = {
  id: string;
  title: string;
  numBeams: number;
  numHeads: number;
};

export default function Line({ title, lineId }: LineProps) {
  const [user] = useAuthState(auth);
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    getMachines();
  }, [user]);

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

  async function addMachine(machine: Machine) {
    const configColl: CollectionReference = collection(
      db,
      `config/smt/lines/${lineId}/machines`
    );

    await addDoc(configColl, {
      title: machine.title,
      numBeams: machine.numBeams,
      numHeads: machine.numHeads,
    });
    // .then(() => {
    //   const tempMachines: Array<Machine> = [...machines, machine];
    //   tempMachines.sort((a: Machine, b: Machine) =>
    //     a.title.localeCompare(b.title)
    //   );
    //   setMachines(tempMachines);
    // });

    setMachines([]);
    await getMachines();
  }

  async function editMachine(machine: Machine) {
    const docRef: DocumentReference = doc(
      db,
      `config/smt/lines/${lineId}/machines/${machine.id}`
    );

    await updateDoc(docRef, {
      title: machine.title,
      numBeams: machine.numBeams,
      numHeads: machine.numHeads,
    });
    // .then(() => {
    //   const tempMachines: Array<Machine> = [...machines];
    //   for (let i = 0; i < tempMachines.length; i++) {
    //     if (tempMachines[i].id == machine.id) {
    //       tempMachines[i] = machine;
    //       break;
    //     }
    //   }
    //   tempMachines.sort((a: Machine, b: Machine) =>
    //     a.title.localeCompare(b.title)
    //   );
    //   setMachines(tempMachines);
    // });

    setMachines([]);
    await getMachines();
  }

  async function deleteMachine(machine: Machine) {
    const docRef: DocumentReference = doc(
      db,
      `config/smt/lines/${lineId}/machines/${machine.id}`
    );

    await deleteDoc(docRef);
    // then(() => {
    //   const tempMachines: Array<Machine> = [...machines];
    //   for (let i = 0; i < tempMachines.length; i++) {
    //     if (tempMachines[i].id == machine.id) {
    //       tempMachines.splice(i, 1);
    //       break;
    //     }
    //   }
    //   setMachines(tempMachines);
    // });

    setMachines([]);
    await getMachines();
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {machines.map((machine, index) => (
          <Box
            key={index}
            sx={{
              height: '150px',
              width: '150px',
              margin: '10px',
              backgroundColor: '#d0d1d5',
              borderRadius: '10px',
            }}
          >
            {!user ? undefined : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <EditMachineModal
                  _id={machine.id}
                  _title={machine.title}
                  _numBeams={machine.numBeams}
                  _numHeads={machine.numHeads}
                  editMachine={editMachine}
                />
                <DeleteMachineModal
                  _id={machine.id}
                  _title={machine.title}
                  _numBeams={machine.numBeams}
                  _numHeads={machine.numHeads}
                  deleteMachine={deleteMachine}
                />
              </Box>
            )}

            <Machine
              title={machine.title}
              numBeams={machine.numBeams}
              numHeads={machine.numHeads}
            />
          </Box>
        ))}

        {!user ? undefined : <AddMachineModal addMachine={addMachine} />}
      </Box>
    </>
  );
}
