import Image from "next/image";
const Contact = () => {
  return (
    <div className="lg:px-32 py-20" data-testid="contact" >
      <div className="text-center w-fit text-4xl font-bold mx-auto">
        <div>Contact US</div>
        <div className="w-24 h-2 rounded-md bg-light-green ml-auto "></div>
      </div>
      <div className="bg-effect flex gap-5 my-10 w-2/3 mx-auto pr-10 py-10 justify-between relative overflow-hidden">
      <Image
        src="/images/lFlowers.png"
        width={300}
        height="100"
        alt="exaview logo"
        className="absolute -bottom-10 -left-10"
      ></Image>
        <div className="w-1/2 py-16 pl-10">
          <div className="text-3xl font-bold">How to reach us ?</div>
          <div className="text-sm text-gray-600 mt-4">
            We'd love to hear from you! If you have any questions, would like to
            discuss a project, or just want to say hello, please feel free to
            contact us. Our team is always available to help and provide
            guidance.
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-effect px-5 py-3 mt-3">
            <input className="inputs" placeholder="Email" />
          </div>
          <div className="bg-effect px-5 py-3 mt-3">
            <input className="inputs" placeholder="Subject" />
          </div>
          <div className="bg-effect px-5 py-3 mt-3">
            <textarea className="inputs" placeholder="Message" rows={4} />
          </div>
          <div className="mt-5">
            <button className="ml-auto btn-green block">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
