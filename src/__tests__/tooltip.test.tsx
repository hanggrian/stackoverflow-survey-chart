import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import CustomTooltip from '../tooltip';

const VISIBLE = new Set(['Python', 'JavaScript', 'TypeScript']);

const PAYLOAD = [
    {dataKey: 'Python', value: 48.24, color: '#3572a5'},
    {dataKey: 'JavaScript', value: 64.96, color: '#f1e05a'},
    {dataKey: 'TypeScript', value: 30.19, color: '#3178c6'},
];

describe('CustomTooltip', () => {
    it('renders nothing when inactive', () => {
        const {container} =
            render(
                <CustomTooltip active={false} payload={PAYLOAD} label={2021} visible={VISIBLE}/>
            );
        expect(container.firstChild).toBeNull();
    });

    it('renders nothing when payload is empty', () => {
        const {container} =
            render(<CustomTooltip active={true} payload={[]} label={2021} visible={VISIBLE}/>);
        expect(container.firstChild).toBeNull();
    });

    it('renders nothing when payload is absent', () => {
        const {container} =
            render(<CustomTooltip active={true} label={2021} visible={VISIBLE}/>);
        expect(container.firstChild).toBeNull();
    });

    it('renders the year label', () => {
        render(<CustomTooltip active={true} payload={PAYLOAD} label={2021} visible={VISIBLE}/>);
        expect(screen.getByText('2021')).toBeInTheDocument();
    });

    it('renders all visible language names', () => {
        render(<CustomTooltip active={true} payload={PAYLOAD} label={2021} visible={VISIBLE}/>);
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders percentages formatted to 1 decimal place', () => {
        render(<CustomTooltip active={true} payload={PAYLOAD} label={2021} visible={VISIBLE}/>);
        expect(screen.getByText('48.2%')).toBeInTheDocument();
        expect(screen.getByText('65.0%')).toBeInTheDocument();
        expect(screen.getByText('30.2%')).toBeInTheDocument();
    });

    it('sorts entries by value descending', () => {
        render(<CustomTooltip active={true} payload={PAYLOAD} label={2021} visible={VISIBLE}/>);
        const names = screen.getAllByText(/Python|JavaScript|TypeScript/).map(el => el.textContent);
        expect(names).toEqual(['JavaScript', 'Python', 'TypeScript']);
    });

    it('excludes languages not in the visible set', () => {
        const partialVisible = new Set(['Python']);
        render(
            <CustomTooltip active={true} payload={PAYLOAD} label={2021} visible={partialVisible}/>
        );
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.queryByText('JavaScript')).toBeNull();
        expect(screen.queryByText('TypeScript')).toBeNull();
    });

    it('excludes items with null or undefined values', () => {
        const payloadWithNull = [
            ...PAYLOAD,
            {dataKey: 'Dart', value: null, color: '#0175c2'},
        ];
        const visibleWithDart = new Set([...VISIBLE, 'Dart']);
        render(
            <CustomTooltip
                active={true}
                payload={payloadWithNull}
                label={2021}
                visible={visibleWithDart}/>
        );
        expect(screen.queryByText('Dart')).toBeNull();
    });

    it('applies the correct color to each entry', () => {
        const {container} =
            render(<CustomTooltip active={true} payload={PAYLOAD} label={2021} visible={VISIBLE}/>);
        const dots = container.querySelectorAll('.rounded-full');
        const colors = Array.from(dots).map(el => (el as HTMLElement).style.background);
        // sorted order: JavaScript, Python, TypeScript
        expect(colors).toContain('rgb(53, 114, 165)');
        expect(colors).toContain('rgb(241, 224, 90)');
        expect(colors).toContain('rgb(49, 120, 198)');
    });

    it('renders a string label', () => {
        render(<CustomTooltip active={true} payload={PAYLOAD} label="2021" visible={VISIBLE}/>);
        expect(screen.getByText('2021')).toBeInTheDocument();
    });
});
