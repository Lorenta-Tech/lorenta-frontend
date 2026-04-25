import { Link } from "react-router-dom";
import Button from "./Button";
import { GiCheckMark } from "react-icons/gi";

function Hero() {
    return (
    <section className="w-full flex justify-center items-center md:min-h-screen">
      <div className="lg:max-w-5xl max-w-lg mx-auto py-20 grid gap-10 items-center">
        
        <div>
          <h1 className="lg:text-8xl text-5xl font-bold text-textprimary leading-tight">
            Print Anything. <br />
            <span className="text-bgsecondary">Fast. Clean. Reliable.</span>
          </h1>

          <p className="mt-6 text-textprimary text-lg lg:text-2xl">
            Upload your files, customize your prints, and get high-quality results 
            without intervention or middlemen - ready for pickup.
          </p>

          <div className="lg:mt-8 lg:text-2xl text-lg mt-6">
            <Button>
              <Link to="/upload">Upload & Print</Link>
            </Button>

          </div>

          <div className="mt-10 flex flex-row items-center gap-6 lg:text-lg text-sm text-gray-700">
            <span className="flex gap-2 items-center"><GiCheckMark/> Instant Delivery</span>
            <span className="flex gap-2 items-center"><GiCheckMark/> HD Quality</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;