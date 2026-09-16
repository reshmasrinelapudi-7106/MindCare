import { useState } from "react";
import "./App.css";

function App() {
  const [userName, setUserName] = useState(
    localStorage.getItem("mindcareName") || ""
  );

  const [nameInput, setNameInput] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [storyIndex, setStoryIndex] = useState(0);
  const [showBreathing, setShowBreathing] = useState(false);
  const [journal, setJournal] = useState("");
  const [savedJournal, setSavedJournal] = useState("");

  const [streak, setStreak] = useState(
    Number(localStorage.getItem("mindcareStreak")) || 0
  );

  const moods = [
    { name: "Lonely", emoji: "🌧️" },
    { name: "Heartbroken", emoji: "💔" },
    { name: "Stressed", emoji: "😣" },
    { name: "Sad", emoji: "🌸" },
    { name: "Unmotivated", emoji: "🌱" },
    { name: "Overthinking", emoji: "🧠" },
  ];

  const wellnessData = {
    Lonely: {
      title: "You are not alone 🌿",
      message:
        "Feeling lonely can be difficult, but this feeling does not define your life. You deserve connection, care and happiness.",
      suggestions: [
        "Call or message someone you trust.",
        "Spend some time doing something you enjoy.",
        "Go for a short walk or sit somewhere peaceful.",
      ],
      quotes: [
        "You are worthy of love, connection and beautiful moments. 💚",
        "Being alone for a moment does not mean you are forgotten. 🌿",
        "One small connection can make a difficult day feel lighter. 🌸",
      ],
      stories: [
        {
          title: "The Quiet Evening",
          story:
            "A girl once thought that being alone meant nobody cared about her. Slowly, she started spending time with herself, learning new things and reaching out to people she trusted. She discovered that being alone can also be a chance to understand yourself.",
          lesson: "Your current loneliness does not decide your future. 🌱",
        },
        {
          title: "The Empty Chair",
          story:
            "Every evening, a girl sat quietly by the window and felt that something was missing. One day, she decided to call an old friend. That small conversation reminded her that connection can begin with one simple step.",
          lesson:
            "Sometimes one small connection can make a lonely day feel lighter. 💚",
        },
        {
          title: "Finding Her Own Company",
          story:
            "A girl was afraid of spending time alone. She slowly began reading, listening to music and learning things she enjoyed. She realized that enjoying her own company was another way of caring for herself.",
          lesson:
            "Being comfortable with yourself is a beautiful kind of strength. 🌿",
        },
      ],
    },

    Heartbroken: {
      title: "Your heart needs time 💚",
      message:
        "Heartbreak hurts, but love is only one part of your life. Give yourself time to heal and remember your own worth.",
      suggestions: [
        "Give yourself permission to feel your emotions.",
        "Avoid constantly checking old messages or memories.",
        "Focus on yourself, your goals and the people who care about you.",
      ],
      quotes: [
        "Healing is not forgetting. It is learning to live peacefully again. 🌸",
        "You can miss someone and still choose yourself. 💚",
        "A painful chapter does not have to become your whole story. 🌱",
      ],
      stories: [
        {
          title: "Choosing Herself",
          story:
            "After losing someone she loved, a girl felt that her whole world had stopped. With time, she started focusing on her dreams, friendships and small moments of happiness. Slowly, she began finding herself again.",
          lesson:
            "Healing takes time, but you can become stronger through it. 🌿",
        },
        {
          title: "The First Morning",
          story:
            "A girl woke up after a difficult night and decided to do one small thing for herself. She opened the window, listened to music and started her morning slowly. She learned that healing can begin with small moments of self-care.",
          lesson:
            "You can take healing one day and one small step at a time. 🌸",
        },
        {
          title: "A New Chapter",
          story:
            "She once believed that her story had ended after heartbreak. Slowly, she discovered new interests, met new people and worked toward her dreams. Her past remained part of her story, but it no longer controlled every page.",
          lesson:
            "One painful chapter does not have to define your whole story. 🌱",
        },
      ],
    },

    Stressed: {
      title: "Take a slow breath 🧘",
      message:
        "You don't have to solve everything at once. Pause for a moment and focus only on the next small step.",
      suggestions: [
        "Take 5 slow and deep breaths.",
        "Drink some water and relax your shoulders.",
        "Break your work into one small task at a time.",
      ],
      quotes: [
        "You don't have to solve everything today. Take one step at a time. 🌿",
        "Pause. Breathe. You are allowed to take things slowly. 🧘",
        "Small progress is still progress. Give yourself some patience. 💚",
      ],
      stories: [
        {
          title: "One Step at a Time",
          story:
            "A student looked at a huge list of tasks and felt overwhelmed. Instead of trying to finish everything at once, she chose one small task. After completing it, she moved to the next. Slowly, the impossible list became manageable.",
          lesson:
            "You don't need to finish everything today. Just take the next step. 🌱",
        },
        {
          title: "The Five Minute Pause",
          story:
            "A student felt stressed because everything seemed urgent. She took five quiet minutes to breathe and organize her thoughts. After the pause, she could see which task needed attention first.",
          lesson:
            "A short pause can help you approach a difficult moment calmly. 🧘",
        },
        {
          title: "The Smaller List",
          story:
            "A long list made a student feel like giving up. She divided it into three tiny tasks and focused only on the first one. By the end of the day, she had made meaningful progress.",
          lesson:
            "Big problems can feel smaller when you break them into manageable steps. 🌿",
        },
      ],
    },

    Sad: {
      title: "It's okay to have difficult days 🌸",
      message:
        "You don't have to be positive all the time. Be gentle with yourself today. Difficult feelings can pass.",
      suggestions: [
        "Listen to a song that makes you feel calm.",
        "Talk to someone you trust.",
        "Do one small thing that usually makes you happy.",
      ],
      quotes: [
        "A difficult day is not a difficult life. Tomorrow can be different. ☀️",
        "Be gentle with yourself. You are doing better than you think. 💚",
        "You are allowed to rest, feel and slowly begin again. 🌸",
      ],
      stories: [
        {
          title: "A Better Morning",
          story:
            "Some days felt heavy for a young girl. She stopped expecting herself to be happy all the time. She began taking small care of herself by sleeping well, talking to friends and enjoying simple moments.",
          lesson:
            "A difficult day is not a difficult life. Tomorrow can be different. ☀️",
        },
        {
          title: "The Little Garden",
          story:
            "A girl planted a few small flowers during a difficult period in her life. Every morning she watered them and watched them grow. The little garden reminded her that small care can slowly create something beautiful.",
          lesson:
            "Small moments of care can make difficult days feel lighter. 🌸",
        },
        {
          title: "The Smile Again",
          story:
            "A girl thought she would never enjoy simple things again. She started spending time with people she trusted and doing things she loved. Slowly, she began laughing at small moments again.",
          lesson:
            "You are allowed to heal slowly and find happiness again. 💚",
        },
      ],
    },

    Unmotivated: {
      title: "Start with something tiny 🌱",
      message:
        "You don't need to feel motivated before you start. Sometimes motivation comes after taking the first small step.",
      suggestions: [
        "Choose one task and work on it for 10 minutes.",
        "Keep your phone away for a short while.",
        "Celebrate small progress instead of waiting for perfection.",
      ],
      quotes: [
        "You don't need to be perfect. Just take the next small step. 🌱",
        "Start small today. Your future self will thank you. 💚",
        "Motivation can begin with one tiny action. Keep going. 🌿",
      ],
      stories: [
        {
          title: "The First Ten Minutes",
          story:
            "A student wanted to achieve many things but could not find motivation. One day she decided to study for only ten minutes. Ten minutes became twenty, and eventually she built a simple daily habit.",
          lesson:
            "Small actions repeated every day can create big changes. 🌿",
        },
        {
          title: "Just Start",
          story:
            "A student kept waiting for the perfect moment to begin. One morning, she opened her notebook and worked for just five minutes. Starting became easier once she stopped waiting for perfect motivation.",
          lesson:
            "You don't need a perfect beginning. You just need to begin. 🌱",
        },
        {
          title: "Small Progress",
          story:
            "A girl compared herself with everyone around her and felt behind. She started tracking only her own small improvements. After a few weeks, she noticed how much progress she had actually made.",
          lesson:
            "Your progress is still progress, even when it feels small. 💚",
        },
      ],
    },

    Overthinking: {
      title: "Give your mind a pause 🧠",
      message:
        "Not every thought needs an answer right now. Take a pause and bring your attention back to the present moment.",
      suggestions: [
        "Write your thoughts down instead of keeping them in your head.",
        "Take 5 slow breaths.",
        "Ask yourself: Can I do something about this right now?",
      ],
      quotes: [
        "Not every thought needs an answer right now. Give your mind a pause. 🧠",
        "You cannot control every tomorrow. Focus on what you can do today. 🌿",
        "Let some thoughts pass without giving them all your energy. 💚",
      ],
      stories: [
        {
          title: "The Unanswered Questions",
          story:
            "A girl spent hours thinking about things that had not happened yet. She started writing her worries down and separating what she could control from what she could not. Her mind slowly became calmer.",
          lesson:
            "You don't have to solve tomorrow's problems today. 🌸",
        },
        {
          title: "The Thought Notebook",
          story:
            "A girl wrote every worrying thought in a notebook instead of carrying everything in her mind. Some thoughts had solutions, while others needed time. Writing helped her create space between herself and her worries.",
          lesson:
            "Writing your thoughts down can help you look at them more clearly. 🌿",
        },
        {
          title: "Coming Back to Now",
          story:
            "A girl kept thinking about what might happen tomorrow. She began noticing simple things around her, like the sound of rain, her breathing and the warm cup in her hands. Slowly, she learned to return her attention to the present.",
          lesson:
            "The present moment is the only moment you need to handle right now. 🧘",
        },
      ],
    },
  };

  const currentMood = wellnessData[selectedMood];

  const currentStory = currentMood
    ? currentMood.stories[storyIndex]
    : null;

  const getTodayNumber = () => {
    const today = new Date();

    return Number(
      `${today.getFullYear()}${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}${String(today.getDate()).padStart(2, "0")}`
    );
  };

  const getDailyQuote = () => {
    if (!currentMood) {
      return "Every day is a new chance to take care of yourself. 🌿";
    }

    const dayNumber = getTodayNumber();

    return currentMood.quotes[dayNumber % currentMood.quotes.length];
  };

  const saveName = () => {
    const cleanName = nameInput.trim();

    if (cleanName === "") {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("mindcareName", cleanName);
    setUserName(cleanName);
    setNameInput("");
  };

  const handleMoodSelect = (moodName) => {
    setSelectedMood(moodName);
    setStoryIndex(0);

    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem("mindcareLastCheckIn");

    let newStreak =
      Number(localStorage.getItem("mindcareStreak")) || 0;

    if (lastCheckIn !== today) {
      newStreak += 1;

      localStorage.setItem("mindcareStreak", newStreak);
      localStorage.setItem("mindcareLastCheckIn", today);

      setStreak(newStreak);
    }
  };

  const handleNextStory = () => {
    if (!currentMood) return;

    const nextIndex =
      (storyIndex + 1) % currentMood.stories.length;

    setStoryIndex(nextIndex);
  };

  const handleSaveJournal = () => {
    if (journal.trim() === "") {
      alert("Please write something first.");
      return;
    }

    setSavedJournal(journal);
    setJournal("");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h2>MindCare 🌿</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#mood">My Mood</a>
          <a href="#stories">Stories</a>
          <a href="#journal">Journal</a>
        </div>
      </nav>

      <section className="welcome-section">
        {!userName ? (
          <div className="name-box">
            <p className="section-label">WELCOME TO MINDCARE 🌿</p>

            <h2>What should we call you?</h2>

            <p>
              Enter your name to make your MindCare experience personal.
            </p>

            <input
              type="text"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="Enter your name"
            />

            <button className="save-button" onClick={saveName}>
              Continue 💚
            </button>
          </div>
        ) : (
          <div className="personal-header">
            <div>
              <p className="section-label">WELCOME BACK 🌿</p>

              <h2>Hi, {userName}! 💚</h2>

              <p>
                Take a moment and check in with yourself today.
              </p>
            </div>

            <div className="streak-box">
              <span>🔥</span>
              <strong>{streak} Day Streak</strong>
              <small>Keep checking in!</small>
            </div>
          </div>
        )}
      </section>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">
            A safe space for your mind 🌿
          </p>

          <h1>
            Take a moment.
            <br />
            Check in with yourself.
          </h1>

          <p>
            You don't have to handle everything alone.
            <br />
            Tell us how you feel, and let's take one small step together.
          </p>

          <a href="#mood" className="start-button">
            How are you feeling? →
          </a>
        </div>
      </section>

      <section className="mood-section" id="mood">
        <p className="section-label">YOUR FEELINGS MATTER</p>

        <h2>How are you feeling today?</h2>

        <p className="section-text">
          Choose what feels closest to you. There is no right or wrong answer.
        </p>

        <div className="mood-grid">
          {moods.map((mood) => (
            <button
              key={mood.name}
              className={`mood-card ${
                selectedMood === mood.name ? "selected" : ""
              }`}
              onClick={() => handleMoodSelect(mood.name)}
            >
              <span>{mood.emoji}</span>
              <strong>{mood.name}</strong>
            </button>
          ))}
        </div>

        {currentMood && (
          <div className="message-box">
            <h3>{currentMood.title}</h3>

            <p>{currentMood.message}</p>

            <h4>Things you can try today:</h4>

            <ul>
              {currentMood.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>

            <button
              className="story-button"
              onClick={() =>
                document
                  .getElementById("stories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Read a story 📖
            </button>
          </div>
        )}
      </section>

      <section className="quote-section">
        <p className="section-label">TODAY'S MESSAGE ✨</p>

        <h2>Daily Motivation</h2>

        <div className="quote-card">
          <div className="quote-icon">✨</div>

          <p>"{getDailyQuote()}"</p>

          {userName && (
            <strong>— For you, {userName} 💚</strong>
          )}
        </div>
      </section>

      {currentMood && currentStory && (
        <section className="stories-section" id="stories">
          <p className="section-label">A LITTLE STORY FOR YOU</p>

          <h2>{currentStory.title}</h2>

          <div className="story-card">
            <div className="story-icon">📖</div>

            <p>{currentStory.story}</p>

            <div className="lesson">
              <strong>Remember:</strong>

              <p>{currentStory.lesson}</p>
            </div>

            <button
              className="story-button"
              onClick={handleNextStory}
            >
              Next Story →
            </button>
          </div>
        </section>
      )}

      <section className="breathing-section">
        <p className="section-label">RELAX YOUR MIND</p>

        <h2>Take a breathing break 🧘</h2>

        <p className="section-text">
          Give yourself one quiet minute.
        </p>

        <button
          className="breathing-button"
          onClick={() => setShowBreathing(!showBreathing)}
        >
          {showBreathing
            ? "Close Exercise"
            : "Start Breathing Exercise"}
        </button>

        {showBreathing && (
          <div className="breathing-box">
            <div className="breathing-circle">🌿</div>

            <h3>Breathe slowly</h3>

            <p>
              Breathe in for 4 seconds → Hold for 4 seconds → Breathe out
              for 4 seconds.
            </p>

            <p className="breathing-note">
              Repeat this a few times at a comfortable pace.
            </p>
          </div>
        )}
      </section>

      <section className="journal-section" id="journal">
        <p className="section-label">YOUR PRIVATE SPACE</p>

        <h2>Write how you feel ✍️</h2>

        <p className="section-text">
          Sometimes writing your thoughts can make them feel lighter.
        </p>

        <textarea
          value={journal}
          onChange={(event) => setJournal(event.target.value)}
          placeholder="Today I feel..."
        />

        <br />

        <button
          className="save-button"
          onClick={handleSaveJournal}
          >
          Save My Entry 💚
        </button>

        {savedJournal && (
          <div className="saved-entry">
            <h3>Your entry</h3>
            <p>{savedJournal}</p>
          </div>
        )}
      </section>

      <section className="about" id="about">
        <h2>You're not alone. 🌿</h2>

        <p>
          MindCare is a peaceful space designed to help you understand your
          feelings, find motivation and take care of your mental wellness.
        </p>
      </section>

      <footer>
        <p>MindCare 🌿 — Small steps. Better days.</p>
      </footer>
    </div>
  );
}

export default App;