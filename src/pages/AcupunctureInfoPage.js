import React from "react";
import { Link } from "react-router-dom";
import acu_info from "../images/acu_info.webp"

const AcupunctureInfoPage = () => {
    return (
        <div className="page-container">
            <img className="info-pic" src={acu_info} alt="acupuncture" />
            <div className="left-align">
                <p>Balance Your Qi</p>
                <h2>Acupuncture</h2>
                <p>What is Acupuncture good for?<br /><br />
                    Acupuncture is currently used to treat many physical conditions ranging from acute and chronic muscle pain, to headaches and migraines, to allergies. It is commonly used to treat digestive issues such as acid reflux, constipation, or Chron's disease. It is also often used to treat emotional imbalances such as anxiety, stress, and depression.</p>
                <p>Do the needles hurt?<br /><br />
                    Generally, no. There are hundreds of points on the body, some that are more tender than others, but with the proper technique you will generally feel nothing, or maybe a subtle pinch. If you do feel pain, let your Acupuncturist know and they can adjust the needle to relieve it.</p>
                <p>During an Acupuncture treatment your therapist will insert a number of hair-thin needles on different points of your body. The needles are used to stimulate energy, or qi(chi), along the meridians of your body. Stimulating these points will begin to bring balance where there is energetic imbalance.</p>
                <p>With regular Acupuncture treatments, your body and mind will be free and clear of the worries and stressors that life places upon us. Our Acupuncturists are trained in a variety of holistic techniques that will surely help you both mentally and physically.</p><br /><br />
                <Link to="/schedule">
                    <button>Book an Appointment</button>
                </Link>
                <br /><br /><br /><br /><br />
            </div>
        </div>
    );
};

export default AcupunctureInfoPage;
