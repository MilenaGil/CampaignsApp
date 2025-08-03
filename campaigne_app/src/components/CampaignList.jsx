import React from 'react';
import CampaignItem from './CampaignItem';

const CampaignList = ({ campaigns, onDelete, onEdit }) => {
  return (
    <div className="campaign-list">
      <h2>Lista Kampanii (Campaign list)</h2>
      {campaigns.length === 0 ? (
        <p>Brak kampanii do wyświetlenia(No campaigns to display).</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nazwa(name)</th>
              <th>Słowa kluczowe(keywords)</th>
              <th>Stawka(bid amount) [PLN]</th>
              <th>Fundusz(Campaign fund) [PLN]</th>
              <th>Status</th>
              <th>Miasto(town)</th>
              <th>Promień(radius) [km]</th>
              <th>Akcje(actions)</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <CampaignItem
                key={campaign.id}
                campaign={campaign}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignList;
