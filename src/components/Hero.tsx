import { Link } from "react-router-dom";
import Button from "./Button";
import { GiCheckMark } from "react-icons/gi";

function Hero() {
    return (
    <section className="grid min-h-[calc(100vh-148px)] items-center py-10">
      <div className="max-w-3xl">
        
        <div>
          <p className="mb-4 inline-flex rounded-full bg-primary/15 px-3 py-1.5 text-sm font-bold text-primary">Campus printing made simple</p>

          <h1 className="text-5xl font-extrabold leading-tight tracking-normal text-white md:text-7xl">
            Print anything. <br />
            <span className="text-primary">Fast, clean, reliable.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Upload your files, customize your prints, and get high-quality results 
            without intervention or middlemen. Ready for pickup when you are.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/upload">
              <Button>Upload and print</Button>
            </Link>

          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-white/70">
            <span className="inline-flex items-center gap-2"><GiCheckMark/> Quick pickup</span>
            <span className="inline-flex items-center gap-2"><GiCheckMark/> High-quality output</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
