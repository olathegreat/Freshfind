import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import marketData from "../data/freshfindData.json";
import chatbotRules from "../data/chatbotRules.json";
import "./Chatbot.css";

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function getCurrentSeason() {
  const month = new Date().getMonth();
  return month >= 3 && month <= 9 ? "Rainy" : "Harmattan";
}

function findMarketInText(text) {
  const normalizedText = normalize(text);
  return marketData.markets.find((market) =>
    normalizedText.includes(normalize(market.name)),
  );
}

function respondTo(text) {
  const normalizedText = normalize(text);
  const matchedRule = chatbotRules.rules.find((rule) =>
    rule.keywords.some((keyword) =>
      normalizedText.includes(normalize(keyword)),
    ),
  );

  if (!matchedRule) return chatbotRules.fallback;
  if (matchedRule.action === "greeting") return matchedRule.reply;

  if (matchedRule.action === "market_hours") {
    const market = findMarketInText(text);
    if (market) {
      return `${market.name} is scheduled ${market.days.join(", ")} from ${market.hours}.`;
    }
    return "Market hours vary by location. Tell me the market name, or open Find a Market to browse its schedule.";
  }

  if (matchedRule.action === "seasonal_produce") {
    const season = getCurrentSeason();
    const inSeason = marketData.produce
      .filter((item) => item.season === season)
      .slice(0, 6)
      .map((item) => item.name);
    return `${season} season picks include ${inSeason.join(", ")}. You can see the full list on Seasonal Picks.`;
  }

  if (matchedRule.action === "produce_search") {
    const normalizedProduce = marketData.produce
      .map((item) => ({ item, name: normalize(item.name) }))
      .filter(({ name }) => normalizedText.includes(name));
    if (normalizedProduce.length) {
      const { item } = normalizedProduce[0];
      return `${item.name} (${item.category}) is commonly available at ${(item.markets || []).join(", ")}.`;
    }
    const marketProduceMatches = marketData.markets.filter((market) =>
      (market.availableProduce || []).some((item) =>
        normalizedText.includes(normalize(item)),
      ),
    );
    if (marketProduceMatches.length) {
      const produceName = marketProduceMatches
        .flatMap((market) => market.availableProduce || [])
        .find((item) => normalizedText.includes(normalize(item)));
      return `${produceName} is commonly available at ${marketProduceMatches.map((market) => market.name).join(", ")}.`;
    }
    return "I couldn't match that produce name in the guide. Try a specific item, or open Produce Guide to browse the full list.";
  }

  if (matchedRule.action === "market_search") {
    const market = findMarketInText(text);
    if (market) {
      return `${market.name} is in ${market.location}. It is scheduled ${market.days.join(", ")} from ${market.hours}.`;
    }

    const matchingProduce = marketData.produce.find((item) =>
      normalizedText.includes(normalize(item.name)),
    );
    if (matchingProduce) {
      return `Markets that commonly carry ${matchingProduce.name} include ${(matchingProduce.markets || []).join(", ")}.`;
    }

    const suggestions = marketData.markets.slice(0, 4).map((item) => item.name);
    return `Browse markets such as ${suggestions.join(", ")} in Find a Market. You can filter the directory by location, open day, or produce.`;
  }

  return chatbotRules.fallback;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: chatbotRules.greeting, sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const handleSend = (value) => {
    const text = value.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { text, sender: "user" },
      { text: respondTo(text), sender: "bot" },
    ]);
    setInputValue("");
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-launcher"
          type="button"
          aria-label="Open FreshFind Assistant"
          onClick={() => setIsOpen(true)}
        >
          <FaRobot aria-hidden="true" />
        </button>
      )}

      {isOpen && (
        <section className="chatbot-window" aria-label="FreshFind Assistant">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaRobot aria-hidden="true" />
              <span>FreshFind Assistant</span>
            </div>
            <button
              className="close-btn"
              type="button"
              aria-label="Close assistant"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.sender}`}
                className={`message ${message.sender}`}
              >
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-replies">
            {chatbotRules.quickReplies.map((reply) => (
              <button
                key={reply}
                className="quick-reply-btn"
                type="button"
                onClick={() => handleSend(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <form
            className="chatbot-input"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend(inputValue);
            }}
          >
            <input
              type="text"
              placeholder="Ask about markets or produce"
              aria-label="Message FreshFind Assistant"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!inputValue.trim()}
            >
              <FaPaperPlane aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
