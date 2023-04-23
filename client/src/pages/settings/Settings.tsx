import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Line from '../../components/settings/Line';
import AddLineModal from '../../components/settings/AddLineModal';
import EditLineModal from '../../components/settings/EditLineModal';
import DeleteLineModal from '../../components/settings/DeleteLineModal';
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

type SettingsProps = {
  onSetLines(lineArr: Array<Line>): void;
};

type Line = {
  id: string;
  title: string;
};

export default function Settings({ onSetLines }: SettingsProps): JSX.Element {
  const [user] = useAuthState(auth);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    getLines();
  }, [user]);

  async function getLines() {
    const configColl: CollectionReference = collection(db, 'config/smt/lines');
    const tempLines: Array<Line> = [];

    try {
      await getDocs(configColl)
        .then((qs: QuerySnapshot) => {
          qs.forEach((qd: QueryDocumentSnapshot) => {
            let line: Line = {
              id: qd.id,
              title: qd.data().title,
            };

            tempLines.push(line);
          });
        })
        .then(() => {
          tempLines.sort((a: Line, b: Line) => a.title.localeCompare(b.title));
          setLines(tempLines);
          onSetLines(tempLines);
          console.log('called getLines() from Settings');
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function addLine(line: Line) {
    const configColl: CollectionReference = collection(db, 'config/smt/lines');

    await addDoc(configColl, { title: line.title });
    // .then(() => {
    //   const tempLines: Array<Line> = [...lines, line];
    //   tempLines.sort((a: Line, b: Line) => a.title.localeCompare(b.title));
    //   setLines(tempLines);
    // });

    setLines([]);
    await getLines();
  }

  async function editLine(line: Line) {
    const docRef: DocumentReference = doc(db, `config/smt/lines/${line.id}`);

    await updateDoc(docRef, { title: line.title });
    // .then(() => {
    //   const tempLines: Array<Line> = [...lines];
    //   for (let i = 0; i < tempLines.length; i++) {
    //     if (tempLines[i].id == line.id) {
    //       tempLines[i] = line;
    //       break;
    //     }
    //   }
    //   tempLines.sort((a: Line, b: Line) => a.title.localeCompare(b.title));
    //   setLines(tempLines);
    // });

    setLines([]);
    await getLines();
  }

  async function deleteLine(line: Line) {
    const docRef: DocumentReference = doc(db, `config/smt/lines/${line.id}`);

    await deleteDoc(docRef);
    // .then(() => {
    //   const tempLines: Array<Line> = [...lines];
    //   for (let i = 0; i < tempLines.length; i++) {
    //     if (tempLines[i].id == line.id) {
    //       tempLines.splice(i, 1);
    //       break;
    //     }
    //   }
    //   setLines(tempLines);
    // });

    setLines([]);
    await getLines();
  }

  return (
    // Settings container
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
      }}
    >
      {/* ALL LINES */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {lines.map((line, index) => (
          <Box
            key={index}
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
              {!user ? undefined : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <EditLineModal
                    _id={line.id}
                    _title={line.title}
                    editLine={editLine}
                  />
                  <DeleteLineModal
                    _id={line.id}
                    _title={line.title}
                    deleteLine={deleteLine}
                  />
                </Box>
              )}

              <Typography variant="h4" m="10px 0 0 10px" textAlign="center">
                {line.title}
              </Typography>
            </Box>

            <Line title={line.title} lineId={line.id} />
          </Box>
        ))}

        {!user ? undefined : <AddLineModal addLine={addLine} />}
      </Box>
    </Box>
  );
}
