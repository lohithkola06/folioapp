import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  deleteDoc,
  doc,
  type Query,
  type DocumentData,
  type QuerySnapshot,
  type DocumentSnapshot,
  limit,
  startAfter,
  type QueryConstraint
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1JjaFR42gTi_gpd2wP3rp0-vXsF0-biU",
  authDomain: "folio-6e7d4.firebaseapp.com",
  projectId: "folio-6e7d4",
  storageBucket: "folio-6e7d4.appspot.com",
  messagingSenderId: "700252176129",
  appId: "1:700252176129:web:d89798edf79954f1b7a500",
  measurementId: "G-761WH6KVCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);

export { 
  auth, 
  googleProvider, 
  storage, 
  db,
  onSnapshot 
};

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  status: 'pending' | 'completed';
  createdAt: Date;
  userId: string;
}

// Collection References
const documentsRef = collection(db, 'documents');

// Query Scopes
export const documentQueries = {
  // Get all documents for a user
  forUser: (userId: string): Query<DocumentData> => {
    return query(
      documentsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
  },

  // Get documents by status for a user
  forUserByStatus: (userId: string, status: 'pending' | 'completed'): Query<DocumentData> => {
    return query(
      documentsRef,
      where('userId', '==', userId),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
  },

  // Get paginated documents for a user
  forUserPaginated: (
    userId: string, 
    pageSize: number = 10, 
    lastDoc?: DocumentData
  ): Query<DocumentData> => {
    const constraints: QueryConstraint[] = [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    ];

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    return query(documentsRef, ...constraints);
  },

  // Search documents by name for a user
  searchByName: (userId: string, searchTerm: string): Query<DocumentData> => {
    return query(
      documentsRef,
      where('userId', '==', userId),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff'),
      orderBy('name'),
      orderBy('createdAt', 'desc')
    );
  }
};

export const addDocument = async (document: Omit<Document, 'id'>) => {
  return addDoc(documentsRef, {
    ...document,
    createdAt: new Date()
  });
};

export const deleteDocument = async (document: Document) => {
  // Delete from Firestore
  await deleteDoc(doc(db, 'documents', document.id));
  
  // Delete from Storage
  const fileRef = storageRef(storage, new URL(document.url).pathname);
  await deleteObject(fileRef);
};

export const subscribeToUserDocuments = (
  userId: string,
  status: 'pending' | 'completed' | undefined,
  callback: (documents: Document[]) => void
) => {
  const q = status 
    ? documentQueries.forUserByStatus(userId, status)
    : documentQueries.forUser(userId);

  return onSnapshot(q, (snapshot) => {
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Document[];
    callback(documents);
  });
};