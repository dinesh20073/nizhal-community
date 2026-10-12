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
        <div className="ticket-grid">
          {/* Ticket 1 */}
          <div className="item">
            <div className="item-right">
              <h2 className="num">23</h2>
              <p className="day">Feb</p>
              <span className="up-border"></span>
              <span className="down-border"></span>
            </div>
            
            <div className="item-left">
              <div>
                <p className="event">Music Event</p>
                <h2 className="title">Live In Sydney</h2>
                
                <div className="sce">
                  <span className="icon">
                    <i className="fa fa-table"></i>
                  </span>
                  <p>Monday 15th 2026 <br /> 15:20Pm & 11:00Am</p>
                </div>
                <div className="loc">
                  <span className="icon">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <p>North,Soth, United State , Amre <br /> Party Number 16,20</p>
                </div>
              </div>
              <div className="btn-wrap">
                <button className="booked" onClick={handleBookingClick}>Bookings</button>
              </div>
            </div>
          </div>

          {/* Ticket 2 */}
          <div className="item">
            <div className="item-right">
              <h2 className="num">23</h2>
              <p className="day">Feb</p>
              <span className="up-border"></span>
              <span className="down-border"></span>
            </div>
            
            <div className="item-left">
              <div>
                <p className="event">Music Event</p>
                <h2 className="title">Live Been Corrage</h2>
                
                <div className="sce">
                  <span className="icon">
                    <i className="fa fa-table"></i>
                  </span>
                  <p>Monday 15th 2026 <br /> 15:20Pm & 11:00Am</p>
                </div>
                <div className="loc">
                  <span className="icon">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <p>North,Soth, United State , Amre <br /> Party Number 16,20</p>
                </div>
              </div>
              <div className="btn-wrap">
                <button className="booked" onClick={handleBookingClick}>Bookings</button>
              </div>
            </div>
          </div>

          {/* Ticket 3 */}
          <div className="item">
            <div className="item-right">
              <h2 className="num">23</h2>
              <p className="day">Feb</p>
              <span className="up-border"></span>
              <span className="down-border"></span>
            </div>
            
            <div className="item-left">
              <div>
                <p className="event">Music Kaboom</p>
                <h2 className="title">Music Party</h2>
                
                <div className="sce">
                  <span className="icon">
                    <i className="fa fa-table"></i>
                  </span>
                  <p>Monday 15th 2026 <br /> 15:20Pm & 11:00Am</p>
                </div>
                <div className="loc">
                  <span className="icon">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <p>North,Soth, United State , Amre <br /> Party Number 16,20</p>
                </div>
              </div>
              <div className="btn-wrap">
                <button className="booked" onClick={handleBookingClick}>Bookings</button>
              </div>
            </div>
          </div>

          {/* Ticket 4 */}
          <div className="item">
            <div className="item-right">
              <h2 className="num">23</h2>
              <p className="day">Feb</p>
              <span className="up-border"></span>
              <span className="down-border"></span>
            </div>
            
            <div className="item-left">
              <div>
                <p className="event">Music Event</p>
                <h2 className="title">Hello Dubail Visivle</h2>
                
                <div className="sce">
                  <span className="icon">
                    <i className="fa fa-table"></i>
                  </span>
                  <p>Monday 15th 2026 <br /> 15:20Pm & 11:00Am</p>
                </div>
                <div className="loc">
                  <span className="icon">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <p>North,Soth, United State , Amre <br /> Party Number 16,20</p>
                </div>
              </div>
              <div className="btn-wrap">
                <button className="booked" onClick={handleBookingClick}>Bookings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTickets;
