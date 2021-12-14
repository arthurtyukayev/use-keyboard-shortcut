import { checkHeldKeysRecursive } from '../../lib/utils'

describe('checkHeldKeysRecursive', () => {
  it('return early with false if passed key is not in shortcut array', () => { 
    // Function expects all inputs to be lowercase normalized
    const shortcutKey = 'a'
    const shortcutArray = ['shift', 'k']
    // By settings this to null, we make sure to return false before an error is thrown.
    const heldKeysArray = null

    const isKeyPartOfShortcutCheck = checkHeldKeysRecursive(shortcutKey, null, shortcutArray, heldKeysArray)
    expect(isKeyPartOfShortcutCheck).to.equal(false)
  })

  it('return early with false if held keys array and shortcut array do not match', () => { 
    // Function expects all inputs to be lowercase normalized
    const shortcutKey = 'j'
    const shortcutArray = ['shift', 'f', 'j']
    const heldKeysArray = ['shift']

    expect(checkHeldKeysRecursive(shortcutKey, null, shortcutArray, heldKeysArray)).to.equal(false)
  })

  it('return early with true if shortcut key matches first index of shortcuy array', () => { 
    // Function expects all inputs to be lowercase normalized
    const shortcutKey = 'f'
    const shortcutArray = ['f']
    const heldKeysArray = []

    expect(checkHeldKeysRecursive(shortcutKey, null, shortcutArray, heldKeysArray)).to.equal(true)
  })

  it('return false if key previous to shortcut key is not being held down', () => { 
    // Function expects all inputs to be lowercase normalized
    const shortcutKey = 'e'
    const shortcutArray = ['d', 'a', 'e']
    const heldKeysArray = ['d']

    expect(checkHeldKeysRecursive(shortcutKey, null, shortcutArray, heldKeysArray)).to.equal(false)
  })

  it('return true while recursively checking large shortcut combination', () => { 
    // Function expects all inputs to be lowercase normalized
    const shortcutKey = 'e'
    const shortcutArray = ['d', 'a', 'c', 'e']
    const heldKeysArray = ['d', 'a', 'c']

    expect(checkHeldKeysRecursive(shortcutKey, null, shortcutArray, heldKeysArray)).to.equal(true)
  })
})
