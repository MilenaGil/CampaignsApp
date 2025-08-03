import React, { useState, useEffect } from 'react';

const towns = ["Warszawa", "Kraków", "Gdańsk", "Wrocław"];
const availableKeywords = [
  "finanse",
  "nieruchomości",
  "samochody",
  "moda",
  "elektronika",
  "jedzenie",
  "finance",
  "real estate",
  "cars",
  "fashion",
  "electronics",
  "food"
];

const CampaignForm = ({ onSave, emeraldBalance, campaignToEdit, clearEdit }) => {
  const [campaign, setCampaign] = useState({
    name: "",
    keywords: "",
    bid: "",
    fund: "",
    status: true,
    town: towns[0],
    radius: ""
  });

   const [keywordSuggestions, setKeywordSuggestions] = useState([]);

  useEffect(() => {
    if (campaignToEdit) {
      setCampaign(campaignToEdit);
    }
  }, [campaignToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCampaign({
      ...campaign,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "keywords") {
      const filtered = availableKeywords.filter(k =>
        k.toLowerCase().includes(value.toLowerCase())
      );
      setKeywordSuggestions(filtered);
    }
  };

  const handleKeywordClick = (keyword) => {
    setCampaign({ ...campaign, keywords: keyword });
    setKeywordSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(campaign.bid) > parseFloat(campaign.fund)) {
      alert("Stawka nie może być większa niż fundusz kampanii\n(The stake cannot be greater than the campaign fund)!");
      return;
    }

    if (!campaign.id && parseFloat(campaign.fund) > emeraldBalance) {
      alert("Brak wystarczających środków na koncie Emerald\n(Insufficient funds in your Emerald account)!");
      return;
    }
    onSave(campaign);
    setCampaign({
      name: "",
      keywords: "",
      bid: "",
      fund: "",
      status: true,
      town: towns[0],
      radius: ""
    });
    clearEdit();
  };

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <h2>{campaign.id ? "Edytuj kampanię (edit Campaign)" : "Dodaj kampanię (add Campaign)"}</h2>
      <label>
        Nazwa kampanii (Campaign name):
        <input
          type="text"
          name="name"
          value={campaign.name}
          onChange={handleChange}
          required
        />
        {keywordSuggestions.length > 0 && (
          <ul className="suggestions">
            {keywordSuggestions.map((k, index) => (
              <li key={index} onClick={() => handleKeywordClick(k)}>
                {k}
              </li>
            ))}
          </ul>
        )}
      </label>
      <label>
        Słowa kluczowe (keywords):
        <input
          type="text"
          name="keywords"
          value={campaign.keywords}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Stawka (bid amount) [PLN]:
        <input
          type="number"
          name="bid"
          value={campaign.bid}
          min="1"
          step="0.01"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fundusz kampanii (Campaign fund) [PLN]:
        <input
          type="number"
          name="fund"
          value={campaign.fund}
          min="1"
          step="0.01"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Status:
        <input
          type="checkbox"
          name="status"
          checked={campaign.status}
          onChange={handleChange}
        />
        {campaign.status ? "Włączona (enabled)" : "Wyłączona (disabled)"}
      </label>
      <label>
        Miasto (town):
        <select
          name="town"
          value={campaign.town}
          onChange={handleChange}
        >
          {towns.map((town) => (
            <option key={town} value={town}>{town}</option>
          ))}
        </select>
      </label>
      <label>
        Promień (radius) [km]:
        <input
          type="number"
          name="radius"
          value={campaign.radius}
          min="1"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{campaign.id ? "Zapisz zmiany (save changes)" : "Dodaj kampanię (add Campaign)"}</button>
    </form>
  );
};

export default CampaignForm;
