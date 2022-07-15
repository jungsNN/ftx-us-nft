
import create  from 'zustand';
import { NFT } from '../types/nft';
import { NFTCollectionMetadata } from '../types/collection';

export type FetchError = {
  collectionError: string | null;
  nftError: string | null;
}

type State = {
  collections: NFTCollectionMetadata[],
  nfts: NFT[],
  errors: FetchError,
  setNfts: (nfts: NFT[]) => void,
  setCollections: (collections: NFTCollectionMetadata[]) => void,
  setErrors: (errors: FetchError) => void,
}


const useStore = create<State>((set) => ({
  collections: [],
  nfts: [],
  errors: {
    collectionError: null,
    nftError: null,
  },
  setNfts: (nfts: NFT[]) => set((state) => ({ nfts: state.nfts = nfts })),
  setCollections: (collections: NFTCollectionMetadata[]) =>
    set((state) => ({ collections: state.collections = collections})),
  setErrors: (errors: FetchError) => set((state)=> ({
    errors: state.errors = errors
  }))

}))
// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistNfts = persistReducer(persistConfig, nfts);

// export const reduxStore = configureStore({
//   devTools: process.env.NODE_ENV !== 'production',
//   reducer: {
//     // nfts: persistNfts,
//     // nftCollections: nftCollections,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })

// export const persistorStore = persistStore(reduxStore);
// reduxStore.dispatch(updateVersion());


// export type AppDispatch = typeof reduxStore.dispatch
// export type AppState = ReturnType<typeof reduxStore.getState>
// export const useAppDispatch = () => useDispatch<AppDispatch>()

// export const useStore = create(persist((set: (x) => void, get: any) => ({
//     collections: [],
//     loading: false,
//     hasErrors: false,
//     fetch: async () => {
//       const resp = await fetch('api/collections/0/10')
//       set({ collections:await resp.json() });
//     },
//     setCollections: (collections) => set({ collections: collections }),
//     addCollections: async () => {
//       set(() => ({ loading: true }));
//       try {
//         const response = await axios.get(
//           NFT_COLLECTIONS_ENDPOINT
//         );
//         set((state) => ({ 
//             collections: (state.collections = response.data.result.collections),
//             loading: false 
//           }));
//       } catch (err) {
//         set(() => ({ hasErrors: true, loading: false }));
//       }
//     },
//     // action: () => {
//     //   const collections = get().collections;

//     // },
//     // addCollections: () => set((state) => ({ collections: state.collections }))
//   }),
//   {
//     name: 'collections', // unique name
//     getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
//   }
//   ));

// useStore = persist(useStore, { name: 'collectionStore' });
// useStore = devtools(useStore);

export default useStore;