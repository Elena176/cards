import {isEmailValid} from "utils";

test('Should validate email', () => {
    expect(isEmailValid("sasa@gmail.com")).toBe(true)
    expect(isEmailValid( "something@something.com")).toBe(true);
    expect(isEmailValid("someone@localhost.localdomain")).toBe(true);
    expect(isEmailValid("someone@127.0.0.1")).toBe(false);
    expect(isEmailValid("a/b@domain.com")).toBe(true);
    expect(isEmailValid("{}@domain.com")).toBe(true);
    expect(isEmailValid("m*'!%@something.sa")).toBe(true);
    expect(isEmailValid("tu!!7n7.ad##0!!!@company.ca")).toBe(true);
    expect(isEmailValid("%@com.com")).toBe(true);
    expect(isEmailValid("!#$%&'*+/=?^_`{|}~.-@com.com")).toBe(true);
    expect(isEmailValid("someone@do-ma-in.com")).toBe(true);
    expect(isEmailValid("a@p.com")).toBe(true);
    expect(isEmailValid("")).toBe(false);
    expect(isEmailValid("someone@somewhere.com.")).toBe(false);
    expect(isEmailValid("someone@somewhere_com")).toBe(false);
    expect(isEmailValid("someone@some:where.com")).toBe(false);
    expect(isEmailValid(".")).toBe(false);
    expect(isEmailValid("F/s/f/a@feo+re.com")).toBe(false);
    expect(isEmailValid( "some+long+email+address@some+host-weird-/looking.com")).toBe(false);
    expect(isEmailValid("invalid:email@example.com")).toBe(false);
    expect(isEmailValid("@somewhere.com")).toBe(false);
    expect(isEmailValid("example.com")).toBe(false);
    expect(isEmailValid("@@example.com")).toBe(false);
    expect(isEmailValid("a space@example.com")).toBe(false);
    expect(isEmailValid("something@ex..ample.com")).toBe(false);
    expect(isEmailValid("a\b@c")).toBe(false);})
