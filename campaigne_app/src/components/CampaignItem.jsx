 import React from 'react';

const CampaignItem = ({ campaign, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{campaign.name}</td>
      <td>{campaign.keywords}</td>
      <td>{campaign.bid}</td>
      <td>{campaign.fund}</td>
      <td>{campaign.status ? "Włączona" : "Wyłączona"}</td>
      <td>{campaign.town}</td>
      <td>{campaign.radius}</td>
      <td>
        <button onClick={() => onEdit(campaign)}>edytuj (edit)</button>
        <button onClick={() => onDelete(campaign.id)}>usuń (delete)</button>
      </td>
    </tr>
  );
};

export default CampaignItem;
