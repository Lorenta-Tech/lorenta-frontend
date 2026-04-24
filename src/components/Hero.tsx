import { Link } from "react-router-dom";
import Button from "./Button";

function Hero() {
    return (
    <section className="w-full bg">
      <div className="max-w-7xl mx-auto py-20 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h1 className="text-5xl font-bold text-textprimary leading-tight">
            Print Anything. <br />
            <span className="text-bgsecondary">Fast. Clean. Reliable.</span>
          </h1>

          <p className="mt-6 text-lg text-textprimary">
            Upload your files, customize your prints, and get high-quality results 
            without intervention or middlemen - ready for pickup.
          </p>

          <div className="mt-12">
            <Button>
              <Link to="/upload">Upload & Print</Link>
            </Button>

          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
            <span>Instant Delivery</span>
            <span>HD Quality</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;