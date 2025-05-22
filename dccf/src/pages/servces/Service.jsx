import React from 'react'
import './Service.scss';
import {Link} from 'react-router-dom'

const Service = () => {
  return (
    <section id='services' className='services'>
        {/* <h1>Services de la direction de cadaster et de la conservation foncier</h1>
        <p>dans cette section vous allez avoire toutes les information consernat chaque service de la direction de cadaster et de la conservation foncier, ont vas vous donner toute les information et toutes les papier que vous devez preparer si vous voulez effectuer une demande. et pour chaque demande vous pouvez cliquer sur les papier pour les telecharger et les envoiyer avec le formulaire dans le cas ou vous voulez efectuer une telle demande. bonne lecture</p> */}
      {/* attestation cadastrelle */}
      <div className='demandes'>
        <div className="item">
            <div className="title">
            <h2>Demande d{`'`}une attestation cadastralle</h2>
            <hr />
          </div>
          <div className="demande">
            <h3>Qu-est ce que une attestation cadastralle</h3>
            <p>Une attestation cadastrale est un document officiel délivré par les autorités compétentes (généralement le service cadastral) qui atteste des informations et des caractéristiques d'une propriété ou d'un bien immobilier. Cette attestation est souvent utilisée dans le contexte de transactions immobilières, de demandes administratives ou de procédures juridiques liées à la propriété. <br />
            
            L'attestation cadastrale vise à fournir une preuve officielle et légale des caractéristiques et de la situation cadastrale d'une propriété. Cela peut être nécessaire pour des transactions immobilières, des demandes de crédit hypothécaire, des procédures de division de terrain, des contentieux fonciers, etc.
            </p>
            <h3>le dossier a construire</h3>
            <div className="btnUl">
              <ul>
                <li> La demande manuscrite</li> 
                <li>Le plan de situation avec Google Earth</li>
                <li>La quittance de paiement des frais de la prestation</li>
              </ul>
            </div>
            <div className="btnD">
              <Link to={'/demande/attestationCadastrelle'}>
                <button className='buttonText'>Effecteur une demande</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* livret foncier */}
      <div className='demandes'>
        <div className="item">
            <div className="title">
              <h2>Demande d{`'`}un livret foncier</h2>
              <hr />
            </div>
            <div className="demande">
              <h3>Qu-est ce que c'est un livret foncier</h3>
              <p>Un livret foncier, également connu sous le nom de "livre foncier", est un document officiel et légal qui sert à attester de la propriété d'un bien immobilier. Il est émis et géré par les autorités foncières et cadastrales d'un pays. Le livret foncier a pour objectif de fournir une preuve formelle et enregistrée de la propriété d'une parcelle de terrain ou d'un bien immobilier.</p>
              <h3>Le dossier a construire</h3>
              <div className="btnUl">
                <ul>
                  <li>Extrait de naissance des propriétaires</li> 
                  <li>Copie de la carte d'identité nationale (CNI) des propriétaires </li>
                  <li>Quittance de paiement des frais de la prestation </li>
                  <li>Procuration notariale</li>
                  <li>La fredha pour les héritiers </li>
                </ul>
              </div>
              <div className="btnD">
              <Link to={'/demande/livretFoncier'}>
                <button className='buttonText'>Effecteur une demande</button>
              </Link>
              </div>
            </div>
        </div>
          
      </div>

      {/* Inconnu */}
      <div className='demandes'>
        <div className="item">
          <div className="title">
              <h2> Régularisation des immeubles inscrits au compte des biens non réclamés lors des opérations cadastrales</h2>
              <hr />
            </div>
            <div className="demande">
              <h3>Le dossier a construire</h3>
              <div className="btnUl">
                <ul>
                  <li>Une demande comprenant les informations suivantes:
                    <ul>
                      <li>La commune où se situe le bien;</li>
                      <li>Le numéro de la section;</li>
                      <li>Le numéro de l'îlot;</li>
                      <li>La superficie de la parcelle revendiquée.</li>
                    </ul>
                  </li> 
                  <li>Les pièces d'état civil du ou des requérant(s):
                    <ul>
                      <li>Extrait de naissance;</li>
                      <li>Copie de la pièce d'identité.</li>
                    </ul>
                  </li> 
                  <li>Une fredha (Lorsque le bien appartenait à une personne décédée).</li>
                  <li>Une copie de la fiche de l'ilot(délivrée par la conservation foncière territorialement compétente).
                  </li>
                  <li>Tout document, admis par la législation en vigueur, au moyen lequel le requérant entend faire valoir droit sur le bien revendiqué.</li>
                  <li>05 plans de masse et de situation établer par un géomètre expert foncier.</li>
                </ul>
              </div>
              <div className="btnD">
                <Link to={'/demande/inconu'}>
                  <button className='buttonText'>Effecteur une demande</button>
                </Link>             
              </div>
            </div>
        </div>

      </div>

      {/*ZNC*/}
      <div className='demandes'>
        <div className="item">
            <div className="title">
                <h2>Régularisation des immeubles inscrits au compte des zones non cadastrables</h2>
                <hr />
              </div>
              <div className="demande">
                <h3>Le dossier a construire</h3>
                <div className="btnUl">
                  <ul>
                    <li>Une demande comprenant les informations suivantes:
                      <ul>
                        <li>La commune où se situe le bien;</li>
                        <li>Le numéro de la section;</li>
                        <li>La superficie de la parcelle revendiquée.</li>
                      </ul>
                    </li> 
                    <li>Les pièces d'état civil du ou des requérant(s):
                      <ul>
                        <li>Extrait de naissance;</li>
                        <li>Copie de la pièce d'identité.</li>
                      </ul>
                    </li> 
                    <li>Une fredha (Lorsque le bien appartenait à une personne décédée).</li>
                    <li>Tout document, admis par la législation en vigueur, au moyen lequel le requérant entend faire valoir droit sur le bien revendiqué.</li>
                    <li>05 plans de masse et de situation établer par un géomètre expert foncier.</li>
                  </ul>
                </div>
                <div className="btnD">
                  <Link to={'/demande/znc'}>
                    <button className='buttonText'>Effecteur une demande</button>
                  </Link>             
                </div>
              </div>
        </div>
      </div>
      {/* demande d'enquête foncière */}
      <div className='demandes'>
        <div className="item">
        <div className="title">
            <h2>Demande d'une enquête foncière.</h2>
            <hr />
          </div>
          <div className="demande">
              <h3>Le dossier a construire</h3>
              <div className="btnUl">
                <ul>
                  <li>Plan de masse et de situation délivré par un géomètre agréé.</li> 
                  <li>Rapport d'expertise.</li> 
                  <li>Extrait de naissance de propriétaire.</li>
                  <li>Demande d'ouverture d'enquête foncière égalisée auprès de l'APC.</li>
                  <li>Déclaration de vente égalisée.</li>
                  <li>Déclaration de donation ou de partage.</li>
                  <li>Une fredha (dans le cas échéant).</li>
                  <li>Procuration notariale ou consulaire(dans le cas échéant).</li>
                  <li>Déclaration sur l'honneur en cas de CP</li>
                  <li>Déclaration de l'existence établie par l'APC.</li>
                  <li>Certificat de possession identique par rapport à l'expertise (Établi par le géomètre).</li>
                </ul>
              </div>
              <div className="btnD">
                <Link to={'/demande/enquete'}>
                  <button className='buttonText'>Effecteur une demande</button>
                </Link>             
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Service
