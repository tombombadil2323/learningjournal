import React from 'react';
import '../../w3.css';

const about = (props) => {

    return (
        <div style={{marginTop:'70px', marginBottom:'30px'}}>
            <h3>
                About:
            </h3>
            <p>
                The purpose of this website is to provide a simple space to capture and reflect on your personal learning journey.
                You can add, view, edit and delete your learning journal entries.
                More features might follow, e.g. tagging entries, searching, sharing entries with mentors or coaches and exporting the whole journal.
                The technical basis is a mobile-first react.js connected to a Firebase database and authentication with secure SSL connection enforced.
            </p>
            <h3>
                Legal:
            </h3>
            <p>
                This is a private website hosted in Germany. German laws apply. 
                Usage is at your own risk and without any guarantees or warranties. 
                Upon using this website you (the releasor) waive and release 
                all liability claims that might be brought forward in the past, 
                present or future towards the website provider (the releasee).
            </p>
            <p>
                Angaben gemäß § 5 TMG
                <p>
                    Betreiber und Kontakt:
                    <p>
                        Tom Lawson<br/>
                        Grünbergerstrasse 13<br/>
                        10243 Berlin<br/>
                        E-Mail: info@learningjournal.online<br/>
                        Telefon: 0151 - 149 77 423
                    </p>
                    <p>
                    Inhaltlich Verantwortlicher nach § 55 Abs. 2 RStV:
                    Tom Lawson 
                    </p>
                </p>
            </p>
        </div>
    );
};

export default about;