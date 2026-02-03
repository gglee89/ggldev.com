import { useState } from 'react'
import classnames from 'classnames'

// Styles
import './mission.css'

// Icons
import icons from 'shared/icons'

const FONT_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    EXTRA_LARGE: 'extra-large',
}

function Mission() {
    const [font, setFont] = useState({ size: FONT_SIZES.SMALL })

    const missionContainerClass = classnames({
        'mission-container': true,
        'mission-font-size-small': font.size === FONT_SIZES.SMALL,
        'mission-font-size-medium': font.size === FONT_SIZES.MEDIUM,
        'mission-font-size-large': font.size === FONT_SIZES.LARGE,
        'mission-font-size-extra-large': font.size === FONT_SIZES.EXTRA_LARGE,
    })

    const missionSmall = classnames({
        'mission-font-size-small': true,
        active: font.size === FONT_SIZES.SMALL,
    })
    const missionMedium = classnames({
        'mission-font-size-medium': true,
        active: font.size === FONT_SIZES.MEDIUM,
    })
    const missionLarge = classnames({
        'mission-font-size-large': true,
        active: font.size === FONT_SIZES.LARGE,
    })
    const missionExtraLarge = classnames({
        'mission-font-size-extra-large': true,
        active: font.size === FONT_SIZES.EXTRA_LARGE,
    })

    return (
        <div className={missionContainerClass}>
            <div className="mission-button-container">
                <div
                    onClick={() => setFont({ size: FONT_SIZES.SMALL })}
                    className={missionSmall}
                >
                    A
                </div>
                <div
                    onClick={() => setFont({ size: FONT_SIZES.MEDIUM })}
                    className={missionMedium}
                >
                    A
                </div>
                <div
                    onClick={() => setFont({ size: FONT_SIZES.LARGE })}
                    className={missionLarge}
                >
                    A
                </div>
                <div
                    onClick={() => setFont({ size: FONT_SIZES.EXTRA_LARGE })}
                    className={missionExtraLarge}
                >
                    A <img src={icons.view} alt="eyes" />
                </div>
            </div>
            <div className="mission-item">
                <span style={{ fontWeight: 'bold' }}>Go to the Gemba.</span>{' '}
                Apply Toyota Chairman Fujio Cho&#39;s words &#34;Go See, Ask
                Why, Show Respect&#34;. Be involved with the nitty-gritty of
                field processes with people to achieve a purpose. Optimize
                processes to enable people to work towards achieving
                organizational purpose.
            </div>
            <div className="mission-item">
                <span style={{ fontWeight: 'bold' }}>Never stop learning.</span>{' '}
                Always try to understand one&#39;s view prior to formulating an
                output. The &#34;Culture of Learning&#34;. Live by Bayes&#39;s
                Theorem applied to approaching one&#39;s understanding of the
                unknown source event by measuring the outcome of subsequent
                events. Putting it simply, is to expose one&#39;s self to new
                experiences in order to find why the first one even took place.
            </div>
            <div className="mission-item">
                <a
                    href="http://rmurphey.com/blog/2015/03/23/a-baseline-for-front-end-developers-2015"
                    style={{
                        textDecoration: 'underline',
                    }}
                >
                    Rebecca Murphy&#39;s quote that resonates with many selves
                    including my own:
                </a>
                <span className="mission-quote">
                    &#34;For me, I don&#39;t want to get a job; I want to get
                    invited to great jobs. I don&#39;t want to go to work; I
                    want to go to work with talented people. And I don&#39;t
                    want to be satisfied with knowing enough to do the work that
                    needed to be done yesterday; I want to know how to do the
                    work that will need to get done tomorrow.&#34;
                </span>
            </div>
            <div className="mission-item">
                To incessantly respect others regardless of the prior. And from
                my favorite book:{' '}
                <a
                    href="https://en.wikipedia.org/wiki/The_Alchemist_(novel)"
                    style={{ textDecoration: 'underline' }}
                >
                    Paulo Coelho&#39;s &#34;The Alchemist&#34;
                </a>
                . The most famous quote to reference is:
                <span className="mission-quote">
                    &#34;When you want something; all the universe conspire in
                    helping you to achieve it.&#34;
                </span>
                And thus, one&#39;s prime goal (as referring to my own) is to
                speak up as to be listened and to be acknowledged.
            </div>
            <div className="mission-item">
                Lastly, in a more technical note, is to be part of the Machine
                Learning movement. Helping others with state-of-the-art tools
                that can bring intelligent solutions to unforseen circumstances.
            </div>
        </div>
    )
}

export default Mission
