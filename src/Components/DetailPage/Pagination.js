import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);
  
    return (
      <>
        <Nav>
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </Button>
            {Array(numPages)
                .fill()
                .map((_, i) => (
                <Button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    aria-current={page === i + 1 ? "page" : null}
                >
                    {i + 1}
                </Button>
                ))}
            <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </Button>
        </Nav>
    </>
    );
}

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin : 16px;
`;

const Button = styled.button`
    border : none;
    padding: 8px;
    margin: 0;
    color: #424242;
    font-size: 13px;


    &[disabled] {
    cursor: revert;
    transform: revert;
    }

    &[aria-current] {
    font-weight: bold;
    color : FFBA94;
    cursor: revert;
    transform: revert;
}
`;

export default Pagination;