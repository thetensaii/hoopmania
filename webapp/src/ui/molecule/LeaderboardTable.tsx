import { css, type Styles } from "../../../styled-system/css"
import type { Game } from "../../domain/Game"

type Props = {
  games: Game[]
}

const rowSpacingStyle: Styles = {
  '& *': {
    paddingY: '0.5rem'
  },
  '& :first-child': {
    paddingLeft: '1rem',
  },
  '& :last-child': {
    paddingRight: '1rem',
  }
}

export const LeaderboardTable = ({ games }: Props) => {
  return <table className={css({
    w: 'full',
    textAlign: 'left',
    borderCollapse: 'separate',
    borderSpacing: '0px 0.5rem',
    textShadow: 'smallTextBorder'
  })}>
    <thead className={css({ fontWeight: 'bolder', }, rowSpacingStyle)}>
      < tr >
        <th>RANK</th>
        <th>PLAYER</th>
        <th className={css({ textAlign: 'right' })}>SCORE</th>
      </tr >
    </thead >
    <tbody className={css({ fontWeight: 'bold', })}>
      {games.map((g, index) => <LeaderboardItem key={index} position={index + 1} game={g} />)}
    </tbody>
  </table >
}

type ItemProps = {
  position: number,
  game: Game
}
const LeaderboardItem = ({ position, game }: ItemProps) => {
  return <tr className={css({
    bg: 'blue.300',
    borderRadius: '8px',
    boxShadow: `0px 3px {colors.darkBlue.900/50}`,
    '& *': {
      border: '{colors.darkBlue.900/50} solid 2px',
    },
    '& :first-child': {
      borderLeftRadius: '8px',
      borderRight: 'none'
    },
    '& :last-child': {
      borderRightRadius: '8px',
      borderLeft: 'none'
    },
    '& :not(:first-child,:last-child)': {
      borderX: 'none'
    }
  }, rowSpacingStyle)}>
    <td>{position}</td>
    <td>{game.player}</td>
    <td className={css({ textAlign: 'right' })}>{game.score}</td>
  </tr>
}