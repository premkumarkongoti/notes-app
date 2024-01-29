import React, { useState, useEffect, useRef } from 'react';
import modalStyles from './Modal.module.css'; // Import modalStyles
// import styles from './Modal.module.css';

const Modal = (props) => {
  const [formData, setFormData] = useState({ grpName: '', color: '' });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const { closeModal } = props;

  const modalContentRef = useRef(null);

  const color = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.grpName);
  };

  const handleChangeColor = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute('color'),
    });
    console.log(formData.color);
  };

  const handleSubmit = (e) => {
    if (formData.color === '') {
      alert('Please select a color');
      return;
    }
    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.closeModal(false);
  };

  return (
    <>
      {screenSize.width < 800 ? (
        <>
          <div className={modalStyles.modalmobile}>
            <div className={modalStyles.modalcontainermobile}>
              <h2 className={modalStyles.modalhead}>Create New Group</h2>
              <label className={modalStyles.modalgroup}>Group Name</label>
              <input
                type="text"
                className={modalStyles.modaltextmobile}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
              <br />
              <label className={modalStyles.modalcolor}>Choose Colour</label>
              {color.map((color, index) => (
                <button
                  className={`${modalStyles.colorbutton} ${
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
                  onClick={handleChangeColor}
                ></button>
              ))}
              <button className={modalStyles.modalcreatemobile} onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={modalStyles.modal} ref={modalContentRef}>
          <div className={modalStyles.modalcontainer}>
            <h2 className={modalStyles.modalhead}>Create New Group</h2>
            <label className={modalStyles.modalgroup}>Group Name</label>
            <input
              type="text"
              className={modalStyles.modaltext}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={modalStyles.modalcolor}>Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`${modalStyles.colorbutton} ${
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
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className={modalStyles.createbtn} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
