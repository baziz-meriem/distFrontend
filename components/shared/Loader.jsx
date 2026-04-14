import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className="py-5">
      <div className="w-fit animate-spin mx-auto">
        <FontAwesomeIcon
          icon={faSpinner}
          color="black"
          className="text-lg"
          width="15"
        />
      </div>
    </div>
  );
};

export default Loader;
