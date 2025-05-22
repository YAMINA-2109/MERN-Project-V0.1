import React from "react";
import { Modal } from "antd";

const ImageModal = ({ imageUrl, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      width={800} // Ajustez la largeur de la modale en fonction de vos besoins
    >
      <img src={imageUrl} alt="Image agrandie" style={{ width: "100%" }} />
    </Modal>
  );
};

export default ImageModal;