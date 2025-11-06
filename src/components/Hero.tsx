const vtuberWithMascot = "/images/vtuber-with-mascot.png";
const image_a9c11bdbcdc6e8526510a74b79878f471385a47a =
  "/images/a9c11bdbcdc6e8526510a74b79878f471385a47a.png";
const image_1bc0387f9279e1dd829f43409095935dac3c96bb =
  "/images/1bc0387f9279e1dd829f43409095935dac3c96bb.png";
const image_962f2baedefc981bd3cfde7f00314d5fbfc9d51a =
  "/images/962f2baedefc981bd3cfde7f00314d5fbfc9d51a.png";
const image_1718961a2638c3581f34ef1bd88c5e12602c6e8b =
  "/images/1718961a2638c3581f34ef1bd88c5e12602c6e8b.png";
const heroImage = "/images/f817ef1a29b5c690b05ebfc83afb2fef863b2d0d.png";
const hexagonalBg = "/images/58922dcf4b54f768870e201fc765d663a083c65f.png";
const circuitBg = "/images/d281320630ae1ba0e918dac42b556c3fae8ee616.png";
const meteoraLogo = "/images/meteora.png";
const cyreneLogo = "/images/cyrene.png";
const superteamLogo = "/images/74a0b8134d2a5b09a6c280420dd36595734d22b4.png";
const pvcLogo = "/images/9320316b15f577a7e6110fb00ae8788cc2cf7b99.png";

export function Hero() {
  const partners = [
    { name: "Meteora", logo: meteoraLogo, height: "h-6" },
    { name: "CYRENE", logo: cyreneLogo, height: "h-4" },
    { name: "superteam", logo: superteamLogo, height: "h-9" },
    { name: "PVC", logo: pvcLogo, height: "h-7" },
  ];

  return (
    <section id="home" className="relative py-0 md:py-0 overflow-visible">
      {/* Extended Circuit Background - covers Hero + ValueProposition */}
      <div
        className="absolute left-0 right-0 z-0"
        style={{
          backgroundImage: `url(${circuitBg})`,
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          top: 0,
          height: "calc(100% + 500px)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="md:pl-10">
            <p className="text-sm text-gray-600 mb-6">
              🏅 ALTERFUN: 2nd Winner of Startup Village Hanoi
            </p>

            <div className="space-y-2">
              <h1 className="sm:text-lg md:text-2xl lg:text-[35px] text-gray-900 leading-tight text-[36px] font-[Nunito_Sans] not-italic font-bold">
                WE MAKE VIRTUAL CREATOR<br></br>ECONOMY{" "}
                <span className="text-[#7E34FF] text-[42px] font-[Dela_Gothic_One]">
                  TRADABLE
                </span>
                {/*EMPOWERING VIRTUAL CREATORS ECONOMY WITH IP TOKENIZATION*/}
              </h1>
              <p className="text-lg text-gray-600">
                Invest in the next wave of new virtual talents and ride along
                with their success.
              </p>

              {/* Supported By Section */}
              <div className="pt-16">
                <h3 className="text-gray-700 mb-2 text-[16px]">Supported By</h3>
                <div className="flex flex-wrap items-center gap-6">
                  {partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="flex items-center justify-center"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className={`${partner.height} scale-80`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={vtuberWithMascot}
              alt="VTuber character with mascot"
              className="w-full max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
