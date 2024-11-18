test('fetch film', async () => {
    const response = await fetch(`http://localhost:3001/api/dramas`);
    const data = await response.json();
    expect(data).not.toBeNull();
});