import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
const creatorsImage = "images/9eb1eac55c2ecbd4007bef9f0b22323c146fa31a.png";

export function CreatorCTA() {
  const navigate = useNavigate();
  return (
    <section
      id="apply"
      className="py-10 bg-gradient-to-br from-[#7E34FF] to-[#5C26BF] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold">ARE YOU A CREATOR?</h2>

          <div className="my-12">
            <img
              src={creatorsImage}
              alt="VTuber creators"
              className="w-full max-w-3xl mx-auto rounded-2xl"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-bold">
              Give Your Crowd a Way to Grow With You
            </h3>
            <p className="text-xl text-purple-100/80 max-w-2xl mx-auto">
              Join as AlterFUN certified creator now!
            </p>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => {
                navigate("/join");
                window.scrollTo(0, 0);
              }}
              className="bg-[#03EC86] hover:bg-[#02d478] text-white px-12 py-6 text-lg"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
