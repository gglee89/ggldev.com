// Styles
import './attribution.css'

// Components
import Section from 'modules/section/components/Section'
import { getAttribution } from 'modules/attribution/slice'
import { useAppSelector } from 'store'

// Selectors

const Attribution = () => {
    const attributions = useAppSelector(getAttribution)
    const dataAllIds = Object.keys(attributions)

    if (!dataAllIds || dataAllIds.length === 0) return null

    return (
        <div className="attribution-container">
            {dataAllIds.map((dataId) => {
                return (
                    <Section key={dataId} title={dataId} topics={attributions[dataId].topics} isDisabled />
                )
            })}
        </div>
    )
}

export default Attribution
