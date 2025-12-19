# Lesson Notes Formatting Guide

Now you can use Markdown formatting in your lesson notes! Here's how:

## Text Formatting

### Bold Text
```markdown
**This text will be bold**
__This is also bold__
```

### Italic Text
```markdown
*This text will be italic*
_This is also italic_
```

### Bold + Italic
```markdown
***This text is bold and italic***
```

### Underline
```markdown
<u>This text will be underlined</u>
```

### Strikethrough
```markdown
~~This text is crossed out~~
```

### Highlight
```markdown
==This text is highlighted==
```

## Headings

```markdown
# Heading 1 (Largest)
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6 (Smallest)
```

## Lists

### Bullet Lists
```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

### Numbered Lists
```markdown
1. First item
2. Second item
3. Third item
   1. Nested item 3.1
   2. Nested item 3.2
```

### Checklist
```markdown
- [ ] Unchecked item
- [x] Checked item
```

## Links and Images

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](image-url.jpg)
```

## Code

### Inline Code
```markdown
Use `code` for inline code snippets
```

### Code Blocks
````markdown
```python
def hello():
    print("Hello, World!")
```
````

## Quotes

```markdown
> This is a quote
> It can span multiple lines
```

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

## Horizontal Line

```markdown
---
or
***
```

## Example Lesson Note

```markdown
# Introduction to Algebra

## Key Concepts

**Algebra** is the branch of mathematics that uses *letters* and *symbols* to represent numbers.

### Important Points
- Variables represent unknown values
- Equations show relationships between variables
- **Always** balance both sides of an equation

### Basic Operations
1. Addition: `x + 5 = 10`
2. Subtraction: `x - 3 = 7`
3. Multiplication: `2x = 8`
4. Division: `x/4 = 2`

> **Remember:** Whatever you do to one side of the equation, you must do to the other side!

---

## Practice Problems

Try solving these:
- [ ] x + 5 = 12
- [ ] 2x - 3 = 7
- [ ] x/2 = 6

**Good luck!**
```

## How to Update Lesson Notes

### Via Django Admin
1. Go to your Django admin panel
2. Navigate to Courses → Lessons
3. Edit a lesson
4. In the "Notes" field, use Markdown formatting
5. Save

### Via Database Script
Update your populate scripts to use Markdown formatting in the notes strings.

## Tips

- Use headings to organize content
- Bold important terms and concepts
- Use lists for steps or key points
- Add code blocks for formulas or examples
- Use quotes for important reminders
- Tables work great for comparing concepts
