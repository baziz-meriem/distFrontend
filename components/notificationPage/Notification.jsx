const Notification = ({type,description}) => {
  return (
    <div className=" rounded-2xl shadow-all border border-slate-300 my-5 pb-8 pt-4 px-4">
    <h1 className="font-bold text-xl text-light-green tracking-wide">{type}</h1>
    <h1 className="text-grey mt-2">{description}</h1>
    </div>
  );
};

export default Notification;
