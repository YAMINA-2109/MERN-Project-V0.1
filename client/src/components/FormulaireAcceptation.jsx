import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';

const FormulaireAcceptation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Gérer l'état du formulaire
  const [form] = Form.useForm();

  // Fonction pour ouvrir la modale de réponse d'acceptation
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = async (values) => {
    try {
      // Envoyer les données du formulaire au serveur
      const response = await fetch('/api/accept-demand', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Réponse réussie, fermez la modale
        setIsModalVisible(false);
        form.resetFields();
        message.success('Demande acceptée avec succès');
      } else {
        // Gérer les erreurs en fonction de la réponse du serveur
        message.error('Erreur lors de l\'acceptation de la demande');
      }
    } catch (error) {
      // Gérer les erreurs de connexion au serveur
      console.error('Erreur lors de la soumission du formulaire', error);
      message.error('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  // Fonction pour fermer la modale
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Bouton pour ouvrir la modale */}
      <Button type="primary" onClick={showModal}>
        Accepter la demande
      </Button>

      {/* Modale de réponse d'acceptation */}
      <Modal
        title="Réponse d'acceptation"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          {/* Ajoutez les champs du formulaire ici */}
          <Form.Item
            name="comment"
            label="Commentaire"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer un commentaire',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          {/* Vous pouvez ajouter d'autres champs selon vos besoins */}
        </Form>
      </Modal>
    </div>
  );
};

export default FormulaireAcceptation;
