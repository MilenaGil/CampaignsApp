import React, { useState, useEffect } from 'react';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import './App.css';

const App = () => {
  const [campaigns, setCampaigns] = useState(() => {
    const storedCampaigns = localStorage.getItem('campaigns');
    return storedCampaigns ? JSON.parse(storedCampaigns) : [];
  });

  const [emeraldBalance, setEmeraldBalance] = useState(() => {
    const storedBalance = localStorage.getItem('emeraldBalance');
    return storedBalance ? parseFloat(storedBalance) : 5000;
  });

  const [campaignToEdit, setCampaignToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('emeraldBalance', emeraldBalance.toString());
  }, [emeraldBalance]);

  const addOrUpdateCampaign = (campaign) => {
    if (campaign.id) {
      setCampaigns(prev => {
        const oldCampaign = prev.find(c => c.id === campaign.id);
        if (!oldCampaign) return prev;
        let newBalance = emeraldBalance;
        if (oldCampaign.status && campaign.status) {
          const fundDiff = parseFloat(campaign.fund) - parseFloat(oldCampaign.fund);
          if (fundDiff > 0 && fundDiff > newBalance) {
            alert("Niewystarczające środki na koncie Emerald dla zwiększenia funduszu!\nInsufficient funds in Emerald account to increase fund!");
            return prev; 
          }
          newBalance -= fundDiff;
        } else if (!oldCampaign.status && campaign.status) {
          if (parseFloat(campaign.fund) > newBalance) {
            alert("Niewystarczające środki na koncie Emerald dla włączenia kampanii!\nInsufficient funds in your Emerald account to activate the campaign!");
            return prev;
          }
          newBalance -= parseFloat(campaign.fund);
        } else if (oldCampaign.status && !campaign.status) {
          newBalance += parseFloat(oldCampaign.fund);
        }
        setEmeraldBalance(newBalance);
        return prev.map(c => c.id === campaign.id ? { ...campaign } : c);
      });
    } else {
      if (campaign.status && parseFloat(campaign.fund) > emeraldBalance) {
        alert("Niewystarczające środki na koncie Emerald!\nInsufficient funds in Emerald account!");
        return;
      }

      setCampaigns(prev => [...prev, { ...campaign, id: Date.now() }]);

      if (campaign.status) {
        setEmeraldBalance(prev => prev - parseFloat(campaign.fund));
      }
    }
  };

  const deleteCampaign = (id) => {
    const campaignToDelete = campaigns.find(c => c.id === id);
    if (campaignToDelete) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      if (campaignToDelete.status) {
        setEmeraldBalance(prev => prev + parseFloat(campaignToDelete.fund));
      }
    }
  };


  const editCampaign = (campaign) => {
    setCampaignToEdit(campaign);
  };

  const clearEdit = () => {
    setCampaignToEdit(null);
  };

  return (
    <div className="app">
      <h1>Zarządzanie kampaniami (Campaign management)</h1>
      <CampaignForm
        onSave={addOrUpdateCampaign}
        emeraldBalance={emeraldBalance}
        campaignToEdit={campaignToEdit}
        clearEdit={clearEdit}
      />
      <CampaignList campaigns={campaigns} onDelete={deleteCampaign} onEdit={editCampaign} />
      <div>Saldo na koncie Emerald (Emerald account balance): {emeraldBalance.toFixed(2)} PLN</div>
    </div>
  );
};

export default App;
