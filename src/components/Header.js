import logo from "../images/Vector.svg";

export default function Header(){
    return(
        <header className="header">
        <div className="header__title">
          <img src={logo} alt="title" />
        </div>
      </header>
    );
}
