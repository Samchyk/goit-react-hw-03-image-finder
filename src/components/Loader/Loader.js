import s from './Loader.module.css';
export default function Loader() {
   return (
      <div className={s.BoxLoader1}>
         <div className={s.BoxLoader2}>
            <h2 className={s.Loader} data-text="Loading...">
               Loading...
            </h2>
         </div>
      </div>
   );
}
