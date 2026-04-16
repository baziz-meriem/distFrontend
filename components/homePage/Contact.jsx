import Image from "next/image";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thanks — this demo doesn’t send email yet, but we got your message.");
  };

  return (
    <section className="pb-24 lg:px-32" data-testid="contact">
      <ToastContainer />
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-green md:text-4xl">
            Contact us
          </h2>
          <div className="mx-auto mt-3 h-2 w-24 rounded-md bg-light-green" />
          <p className="mx-auto mt-4 max-w-lg text-sm text-grey">
            Questions about rolling out the dashboard or partnering with our team?
            Leave a note—we read every message.
          </p>
        </div>
        <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-effect shadow-all">
          <Image
            src="/images/lFlowers.png"
            width={300}
            height={100}
            alt=""
            className="absolute -bottom-10 -left-10 opacity-60"
          />
          <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-dark-green">
                How to reach us
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-grey">
                Tell us about your fleet size, regions, or integrations you care
                about. For production inquiries, we&apos;ll route you to the right
                person on the DEVLIFT side.
              </p>
              <p className="mt-6 text-xs text-grey">
                Prefer email? Use the form — we&apos;ll respond as soon as we can.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <div className="rounded-lg border border-gray-200 bg-white/80 px-4 py-3">
                  <input
                    id="contact-email"
                    className="inputs text-sm"
                    placeholder="Your email"
                    type="email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <div className="rounded-lg border border-gray-200 bg-white/80 px-4 py-3">
                  <input
                    id="contact-subject"
                    className="inputs text-sm"
                    placeholder="Subject"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <div className="rounded-lg border border-gray-200 bg-white/80 px-4 py-3">
                  <textarea
                    id="contact-message"
                    className="inputs min-h-[120px] resize-y text-sm"
                    placeholder="Your message"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-green ml-auto block w-full px-6 py-3 font-semibold md:w-auto"
                disabled={sent}
              >
                {sent ? "Message recorded" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
