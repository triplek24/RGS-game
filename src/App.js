import { Component } from "react";
import "./styles.css";

const WhoIsBig = (First, Second) => {
  if (First === Second) {
    return "Tie";
  }
  switch (First) {
    case "Rock":
      if (Second === "Scissors") {
        return First;
      } else {
        return Second;
      }
    case "Paper":
      if (Second === "Rock") {
        return First;
      } else {
        return Second;
      }
    case "Scissors":
      if (Second === "Paper") {
        return First;
      } else {
        return Second;
      }
    default:
  }
};

class App extends Component {
  state = {
    Started: false,
    Player: null,
    Computer: null,
    Name: ""
  };
  render() {
    const { Started, Player, Computer, Name } = this.state;
    const Images = {
      Rock: "https://i.imgur.com/TONXH9s.png",
      Paper: "https://i.imgur.com/t2154qR.png",
      Scissors: "https://i.imgur.com/SXstPKk.png"
    };
    return (
      <div className="App">
        <h1>Rock Paper Scissors</h1>
        {Started ? (
          <div className="Game">
            <div className={"Player" + (Player ? " selected" : "")}>
              <p>Player</p>
              {Player ? (
                <img src={Images[Player]} alt={Player} />
              ) : (
                <div className="choose">
                  {Object.keys(Images).map((a) => (
                    <span
                      key={a}
                      onClick={() => {
                        this.setState({
                          Player: a,
                          Computer: Object.keys(Images)[
                            Math.floor(
                              Math.random() * Object.keys(Images).length
                            )
                          ]
                        });
                      }}
                    >
                      <img src={Images[a]} alt={a} />
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="Computer">
              <p>Computer</p>
              {Computer ? (
                <img src={Images[Computer]} alt={Computer} />
              ) : (
                <img src="https://i.imgur.com/CyvHqQH.png" alt="All Choices" />
              )}
            </div>
          </div>
        ) : (
          <div className="Intro">
            <input
              type="text"
              placeholder="Enter your name, at least 3 characters long..."
              value={Name}
              onChange={(e) => {
                this.setState({ Name: e.target.value });
              }}
            />
            {Name.trim().length > 2 && (
              <img
                className="start"
                src="https://i.imgur.com/FrnyhhB.png"
                alt="Start"
                onClick={() => {
                  this.setState({
                    Started: true
                  });
                }}
              />
            )}
          </div>
        )}
        {Player && Computer && (
          <p className="Results">
            {(() => {
              const Winner = WhoIsBig(Player, Computer);
              if (Winner === "Tie") {
                return "Nobody Wins!";
              } else {
                if (Winner === Player) {
                  return Name + " Wins!";
                } else {
                  return "Computer Wins!";
                }
              }
            })()}
            <img
              src="https://i.imgur.com/529CybI.png"
              alt="Restart"
              onClick={() => {
                this.setState({
                  Started: false,
                  Player: null,
                  Computer: null
                });
              }}
            />
          </p>
        )}
      </div>
    );
  }
}

export default App;
