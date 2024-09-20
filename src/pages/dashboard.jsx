import Nav from "../components/nav";
import Footer from "../components/footer";
import perfil from "/src/assets/perfil.jpg";

export default function Dashboard() {
  return (
    <>
      <Nav></Nav>
      <main className="flex flex-grow justify-center items-center">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-row justify-evenly items-center overflow-auto sm:h-full">
          <p className="w-2/4 text-center sm:text-left">
            I am a Software Engineering student with aspirations of service and
            learning in areas related to Web Development and Cyber Security, I
            have skills and abilities within the software development process.
            With high capacity for teamwork and problem solving.
          </p>
          <img
            src={perfil}
            alt="perfil"
            className="object-cover h-1/3 w-1/4 rounded-full max-w-48"
          />
        </div>
      </main>
      <div className="flex justify-center">
        <hr className="border-y-1 border-slate-950 w-3/4 my-4" />
      </div>
      <p className="text-center text-2xl font-bold">Skills</p>
      <div className="flex max-sm:flex-col justify-evenly items-center w-full my-5">
        <div className="flex flex-col max-sm:mx-5 sm:mx-2 max-w-xs">
          <p className="text-center text-xl font-bold">Hard Skills</p>
          <div className="flex flex-wrap items-center justify-center">
            <p className="text-center text-lg m-2">HTML</p>
            <p className="text-center text-lg m-2">CSS</p>
            <p className="text-center text-lg m-2">JavaScript</p>
            <p className="text-center text-lg m-2">Tailwind CSS</p>
            <p className="text-center text-lg m-2">React</p>
            <p className="text-center text-lg m-2">Next</p>
            <p className="text-center text-lg m-2">Django</p>
          </div>
        </div>
        <hr className="sm:py-16 max-sm:w-2/3 max-sm:mx-auto max-sm:border-y-1 sm:border-x-1 border-slate-950 max-sm:my-3" />
        <div className="flex flex-col max-sm:mx-5 sm:mx-2 max-w-xs">
          <p className="text-center text-xl font-bold">Soft Skills</p>
          <div className="flex flex-wrap items-center justify-center">
            <p className="text-center text-lg m-2">Leadership</p>
            <p className="text-center text-lg m-2">Problem solving</p>
            <p className="text-center text-lg m-2">Teamwork</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
