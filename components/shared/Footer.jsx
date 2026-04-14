import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGoogle,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const socialMedia = [faFacebook, faInstagram, faGoogle, faTwitter, faYoutube];
  return (
    <div className="relative overflow-hidden" data-testid="footer">
      <Image
        src="/images/rFlowers.png"
        width={300}
        height="100"
        alt="exaview logo"
        className="absolute right-0"
      ></Image>
      <Image
        src="/images/lFlowers.png"
        width={300}
        height="100"
        alt="exaview logo"
        className="absolute -left-10 top-16"
      ></Image>
      <Image
        src="/logos/greenDevlift.png"
        width={110}
        height="100"
        alt="exaview logo"
        className="block mx-auto"
      ></Image>
      <div className="my-5 text-center">Building a better tommorrow, today</div>
      <div className="flex justify-center py-4 md:gap-16 gap-8">
        {socialMedia.map((sM, key) => (
          <div key={key} className="text-sm md:text-lg">
            <FontAwesomeIcon icon={sM} width="28" color="gray" />
          </div>
        ))}
      </div>
      <div className="pt-4 pb-2 text-center text-xs md:text-sm">
        Copyright © 2023 DEVLIFT . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
