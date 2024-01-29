
import React, { useState, useEffect, useRef } from 'react';
import modelStyles from './Modal.module.css';

const Modal = (props) => {
  const [formData, setFormData] = useState({ groupName: ' ', color: ' ' });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const closeModal = props.closeModal;
  const modalRef = useRef(null);

  const colorOptions = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  const getScreenSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.groupName);
  };

  const handleColorChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute('color'),
    });
    console.log(formData.color);
  };

  const handleSubmit = (e) => {
  //  if (formData.color === '') {
    //  alert('Please select a color');
     // return;
     if (formData.groupName.trim() === '' || formData.color === '') {
      alert('Please enter group name and select a color');
      return;
    }
    const newGroup = [
      ...groups,
      {
        groupName: formData.groupName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.closeModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  return (
    <>
      {screenSize.width < 989 ? (
        <>
          <div className={modelStyles.modalmobile}>
            <div className={modelStyles.modalcontainermobile} ref={modalRef}>
              <h2 className={modelStyles.modalheadmobile}>Create New Group</h2>
              <label className={modelStyles.modalgroupmobile}>Group Name</label>
              <input
                type="text"
                className={modelStyles.modaltextmobile}
                name="groupName"
                placeholder="Enter your group name"
                onChange={handleInputChange}
              />
              <br />
              <label className={modelStyles.modalcolormobile}>Choose Colour</label>
              {colorOptions.map((color, index) => (
                <button
                  className={`${modelStyles.colorbuttonmobile} ${
                    formData.color === color ? 'selected' : ''
                  }`}
                  name="color"
                  color={color}
                  key={index}
                  id={color}
                  style={{
                    height: '20px',
                    width: '20px',
                    background: color,
                    borderRadius: '25px',
                    border: 'none',
                    marginRight: '5px',
                  }}
                  onClick={handleColorChange}
                ></button>
              ))}
              <button className={modelStyles.createbtn} onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={modelStyles.modal}>
          <div className={modelStyles.modalcontainer}  ref={modalRef}>
            <h2 className={modelStyles.modalhead}>Create New Group</h2>
            <label className={modelStyles.modalgroup}>Group Name</label>
            <input
              type="text"
              className={modelStyles.modaltext}
              name="groupName"
              placeholder="Enter your group name"
              onChange={handleInputChange}
            />
            <label className={modelStyles.modalcolor}>Choose Colour</label>
            {colorOptions.map((color, index) => (
              <button
                className={`${modelStyles.colorbutton} ${
                  formData.color === color ? 'selected' : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px',
                }}
                onClick={handleColorChange}
              ></button>
            ))}
            <button className={modelStyles.createbtn} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
