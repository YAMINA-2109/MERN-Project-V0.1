import React from 'react';
import './About.scss';
import { organisationDccf } from '../../assets';

const About = () => {
  return (
    <div className='section'>
      <div className="container">
      <h1 className="title">À propos de la Direction de Cadastre et de la Conservation Foncière de Bejaia</h1>
      <h2>Qui sommes-nous</h2>
      <p>La DCCF de la Wilaya de Bejaia est un établissement public foncier à caractère administratif, doté de la personnalité morale et de l’autonomie financière.
      Elle a été créée par le Décret exécutif n° 21-393 du 11 Rabie El Aouel 1443 correspondant au 18 octobre 2021, qui fixe l’organisation et les attributions des services extérieurs de la Direction Générale du Domaine National</p>
      <h2>Missions de la direction</h2>
      <p>La DCCF de la Wilaya de Bejaia s’engage à :</p>
        <ul>
          <li>De mettre en œuvre les programmes de production cadastrale et de sa rénovation;</li>
          <li>D’effectuer les procédures d’établissement, de dépôt et de remise des documents cadastraux et d’assurer leur mise à jour et leur concordance avec le livret foncier;</li>
          <li>D’assurer la réalisation des travaux de topographie, les opérations d’enquêtes foncières, de délimitation, de bornage et de partage des propriétés;</li>
          <li>D’organiser la mise en œuvre des opérations relatives à l’institution du livret foncier et à sa tenue à jour régulière;</li>
          <li>De veiller à l’organisation du cadre d’intervention des opérations de publicité foncière;</li>
          <li>De suivre les affaires contentieuses se rapportant au cadastre et à la conservation foncière devant les instances judiciaires compétentes;</li>
          <li>De procéder à la constatation du droit de propriété immobilière et de délivrance de titres de propriété, par voie d’enquête foncière, sur la base d’une demande d’ouverture d’enquête pour chaque immeuble non soumis aux opérations de cadastre général, quelle qu’en soit la nature juridique; </li>
          <li>Defaireassurerlaconservationetlasécuritédesactes,plansettousdocumentsdéposés dans les conservations foncières; — D’établir, d’exploiter et d’échanger les données numériques relatives aux activités du cadastre et de la conservation foncière;</li>
          <li>D’analyser périodiquement l’activité des conservations foncières, d’en dresser les synthèses et d’en faire communication aux autorités hiérarchiques;</li>
          <li>D’exercer l’autorité hiérarchique sur l’ensemble des personnels des services de la direction du cadastre et de la conservation foncière de la wilaya;</li>
          <li>D’assurer la dotation de ses services en moyens et équipements de travail et de veiller à leur entretien et leur utilisation dans les meilleures conditions.</li>
        </ul>
        <h2>Organisation et structure</h2>
        <div className="image-wrapper">
          <img src={organisationDccf} alt="organisationDccf" />
        </div>
      {/* <h2>le BOC</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi est quod eius dolore blanditiis minima dolorem, exercitationem deserunt odio accusantium soluta ad cum, dolor, quis voluptate esse! Excepturi, debitis animi?Lorem ipsum </p> */}
      </div>
    </div>
  )
}

export default About
