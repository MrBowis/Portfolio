import Nav from "../components/nav";
import Footer from "../components/footer";
import perfil from "/src/assets/perfil.jpg";

export default function Dashboard() {
  return (
    <>
      <Nav></Nav>
      <div className="min-h-full">
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-row justify-evenly items-center">
            <p className="w-2/4">
              I am a Software Engineering student with aspirations of service
              and learning in areas related to Web Development and Computer
              Security, I have skills and abilities within the software
              development process. With high capacity for teamwork and problem
              solving.
            </p>
            <img
              src={perfil}
              alt="perfil"
              className="object-cover h-1/3 w-1/4 rounded-full"
            />
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
}
