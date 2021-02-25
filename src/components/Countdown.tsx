import { useContext, useEffect, useState } from "react"
import { ChallengeContext } from "../contexts/ChallengesContexts"
import styles from "../styles/components/Countdown.module.css"

let countdownTimeout: NodeJS.Timeout

export function Countdown() {

    const { startNewChallenge } = useContext(ChallengeContext)


    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const secunds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secundLeft, secundRight] = String(secunds).padStart(2, '0').split('')

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])


    return (
        <>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secundLeft}</span>
                    <span>{secundRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    type="button" className={styles.countdownButton}>
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button
                                onClick={resetCountdown}
                                type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button
                                    onClick={startCountdown}
                                    type="button" className={styles.countdownButton}>
                                    Iniciar clico
                                </button>
                            )}
                    </>

                )}
        </>
    )
}