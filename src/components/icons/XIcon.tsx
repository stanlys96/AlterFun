import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

interface Props {
  className?: string;
  color?: string;
}

export const XIcon = ({ className = "w-5 h-5", color = "white" }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <FontAwesomeIcon className={className} color={color} icon={faXTwitter} />
    </div>
  );
};
