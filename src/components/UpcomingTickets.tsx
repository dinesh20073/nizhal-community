import React from 'react';
import './UpcomingTickets.css';
import upcomingBgUrl from '../assets/upcoming-bg.png';

const UpcomingTickets: React.FC = () => {
  const handleBookingClick = () => {
    window.dispatchEvent(new CustomEvent('openUpcomingEventModal'));
  };

  return (
    <section className="upcoming-events-section" id="upcoming-events">
      {/* Background Image from user Google Drive in Colour (No Blur) */}
      <div className="upcoming-bg-container">
        <img
          src={upcomingBgUrl}
          alt="Nizhal Community"
          className="upcoming-bg-img"
        />
        <div className="upcoming-bg-overlay" />
      </div>

      <div className="container">
        <div className="ticket-single-wrap">
          {/* Single Event Ticket - Will Be Announced Soon */}
          <div className="item">
            <div className="item-right">
              <h2 className="num">--</h2>
              <p className="day">SOON</p>
              <span className="up-border"></span>
              <span className="down-border"></span>
            </div>
            
            <div className="item-left">
              <div>
                <p className="event">Community Gathering</p>
                <h2 className="title">Will Be Announced Soon</h2>
                
                <div className="sce">
                  <span className="icon">
                    <i className="fa fa-calendar"></i>
                  </span>
                  <p>Date & time will be announced soon <br /> Upcoming community circles & experiences</p>
                </div>
                <div className="loc">
                  <span className="icon">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <p>Chennai, Tamil Nadu <br /> Gathering venue revealed soon</p>
                </div>
              </div>
              <div className="btn-wrap">
                <button className="booked" onClick={handleBookingClick}>Notify Me</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTickets;
